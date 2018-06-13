import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/Search.css'
import qs from 'qs'
import _ from 'lodash'
import * as actions from "../actions/index"
import AudioSearchService from '../services/audio-search-service'
import SermonList from '../containers/sermon_list_container'
import Header from '../components/header'

import CustomizedTabs from '../components/tabs'


class SearchResultsPage extends Component {

    constructor(props){
        super(props);
        if(this.props.searchTerm && this.props.searchTerm != ''){
            this.state = {
                term: this.props.searchTerm,
                width: window.innerWidth
            }
        }
        else{
            this.state = {
                term: '',
                width: window.innerWidth
            };
        }

        this.handleSubmit= this.handleSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
        this.loadSeries = this.loadSeries.bind(this);

        
    }

    handleWindowSizeChange(){
        var w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

        this.setState(...this.state, {width: width, height: height});
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
        const values = qs.parse(this.props.location.search.slice(1));
        
        if(values.q){
            this.props.fetchSearchResults(values.q);
            this.setState(...this.state, {term: values.q});
        }
    }

    componentDidMount(){
        if(this.searchInput){
            this.searchInput.focus();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.searchTerm){
            this.setState(...this.state, {term: nextProps.searchTerm});
        }
    }

    onInputChange(event) {
        this.setState(...this.state, {term: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.fetchSearchResults(this.state.term);
    }

    loadSeries(seriesId) {
        this.props.loadSeries(seriesId);
    }

    renderList(isMobile) {

        if (!_.isEmpty(this.props.searchResults.sermons)) {
            const sermonsList = Object.keys(this.props.searchResults.sermons).map(result => {
                return this.props.searchResults.sermons[result];
            });
            return (
                <SermonList sermons={sermonsList} isMobile={isMobile} />
            );
        }
    }

    hasSearchResults(){
        var hasResults = this.props.searchResults.sermons || this.props.searchResults.series

        if(hasResults){
            hasResults = ! _.isEmpty(hasResults);
        }

        return hasResults;
    }

    renderMobile(){

        const tabs = (this.hasSearchResults()) 
            ? <CustomizedTabs 
                sermons = {this.props.searchResults.sermons} 
                series = {this.props.searchResults.series}
                loadSeriesHandler = {this.loadSeries}
                isMobile = {true}/>
            : <div/>;

        return(
            <div>
                <Header />
                <div className='container-fluid searchContentsPanel' >
                    <div className='row'>
                        <div className='col-sm-12 searchResultsHeading'>
                            
                            <form onSubmit={this.handleSubmit}>
                                <div className="search cursor">
                                    <input type="text" 
                                        placeholder = 'Search Media'
                                        ref={(input) => { this.searchInput = input; }} 
                                        onChange={this.onInputChange} 
                                        value = {this.state.term} />
                                </div>
                            </form>
                        </div>
                    </div> 

                    {tabs}

                </div>

            </div>
        );
    }

    renderDesktop(){

        const tabs = (this.hasSearchResults()) 
            ? <CustomizedTabs 
                sermons = {this.props.searchResults.sermons} 
                series = {this.props.searchResults.series}
                loadSeriesHandler = {this.loadSeries}
                isMobile = {false}/>
            : <div/>;

        const resultsString = (this.state.term != null && this.state.term != "") ? 
            <div>Search results for: <span>{this.state.term}</span></div> : 
            "";

        return(
            <div>
                <Header />
                <div className='container-fluid searchContentsPanel' >
                    <div className='row'>
                        <div className='col-sm-12 searchResultsHeading'>
                            {resultsString}
                        </div>
                    </div>
                    
                    {tabs}

                </div>

            </div>
        );
    }

    render() {
        const { width } = this.state;
        const isMobile = width <= 768;

        if(isMobile){
            return this.renderMobile();
        }
        else{
            return this.renderDesktop();
        }
    }
}

function mapStateToProps(state) {
    return {
        searchResults: state.searchResults,
        searchTerm: state.searchResults.searchTerm
    };
}

function mapDispatchToProps(dispatch) {

    return {
        fetchSearchResults: (query) => {
            dispatch(audioSearchService.freeTextSearch(query));
            dispatch(audioSearchService.freeTextSeriesSearch(query));
        },
        loadSeries: (seriesId) => {
            dispatch(actions.loadSeriesDetails({series: seriesId}));
            dispatch(audioSearchService.getSeriesDetails(seriesId));
        }
    }
}

const audioSearchService = new AudioSearchService();

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResultsPage);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/Search.css'
import qs from 'qs'
import _ from 'lodash'
import { fetchSearchResults } from '../actions/index'
import { bindActionCreators } from 'redux'

import AudioSearchService from '../services/audio-search-service'
import SermonList from '../containers/sermon_list_container'
import Header from '../components/header'
import FooterPlayer from '../containers/footer_player'


class SearchResultsPage extends Component {

    constructor(props){
        super(props);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

        if(this.props.searchTerm){
            this.state = {term: this.props.searchTerm}
        }
        else{
            this.state = {term: ''};
        }
    }

    componentWillMount() {
        const values = qs.parse(this.props.location.search.slice(1));
        
        if(values.q){
            this.props.fetchSearchResults(values.q);
            this.setState({term: values.q});
        }
    }

    componentDidMount(){
        this.searchInput.focus();
    }

    onInputChange(event) {
        this.setState({term: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.fetchSearchResults(this.state.term);
    }

    renderList() {


        if (!_.isEmpty(this.props.searchResults.data)) {
            const sermonsList = Object.keys(this.props.searchResults.data).map(result => {
                return this.props.searchResults.data[result];
            });
            return (
                <SermonList sermons={sermonsList} />
            );
   
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className='container-fluid searchContentsPanel' >
                    <div className='row'>
                        <div className='col-sm-12 searchResultsHeading'>
                            
                            <form onSubmit={this.handleSubmit}>
                                <div className="search cursor">
                                    <input type="text" 
                                        placeholder = 'Search'
                                        ref={(input) => { this.searchInput = input; }} 
                                        onChange={this.onInputChange} 
                                        value = {this.state.term} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-8 searchResultsList '>

                            {this.renderList()}
                        </div>
                    </div>

                </div>

            </div>
        );
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
        fetchSearchResults: (query) => dispatch(audioSearchService.freeTextSearch(query))
    }
}

const audioSearchService = new AudioSearchService();

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResultsPage);


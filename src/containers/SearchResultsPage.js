import React, {Component} from 'react';
import { connect } from 'react-redux';
import qs from 'qs'
import _ from 'lodash'
import { fetchSearchResults } from '../actions/index'
import { bindActionCreators } from 'redux'

import AudioSearchService from '../services/audio-search-service'
import SermonList from '../containers/sermon_list_container'
import Header from '../components/header'
import FooterPlayer from '../containers/footer_player'


class SearchResultsPage extends Component{

    componentWillMount() {
        const values = qs.parse(this.props.location.search.slice(1));
        this.props.fetchSearchResults(values.q);
        
    }

    renderList() {


       if(!_.isEmpty(this.props.searchResults.data)){
           console.log('here');
           const sermonsList = Object.keys(this.props.searchResults.data).map(result => {
               return this.props.searchResults.data[result];
           });
           return(
               <SermonList sermons={sermonsList}/>
           );
           /*return Object.keys(this.props.searchResults.data).map(result => {
                const sermon = this.props.searchResults.data[result];
                return (
                    <SermonListItem key={sermon.id} sermon={sermon} />
                )
           })*/
       } 
    }

    render(){
        return(
            <div>
                <Header/>
                <div className='container-fluid searchContentsPanel' >
                    <div className='row'>
                        <div className='col-sm-12 searchResultsHeading'>
                            <h1>Results: {this.props.searchTerm}</h1>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-4 '>
                            Menu Here
                        </div>
                        <div className='col-sm-8 searchResultsList '>

                            {this.renderList()}
                        </div>
                    </div>

                </div>
                <FooterPlayer />

            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        searchResults: state.searchResults,
        searchTerm: state.searchResults.searchTerm
    };
}

/*function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchSearchResults: fetchSearchResults}, dispatch);
}*/

function mapDispatchToProps (dispatch) {
    
    return { 
        fetchSearchResults: (query) => dispatch(audioSearchService.freeTextSearch(query))
    }
}

const audioSearchService = new AudioSearchService();

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResultsPage);            


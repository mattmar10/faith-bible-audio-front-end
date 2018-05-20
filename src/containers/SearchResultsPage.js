import React, {Component} from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string'
import _ from 'lodash'
import { fetchSearchResults } from '../actions/index'
import { bindActionCreators } from 'redux'

import AudioSearchService from '../services/audio-search-service'
import SermonListItem from '../components/sermon_list_item'


class SearchResultsPage extends Component{

    componentWillMount() {
        const values = queryString.parse(this.props.location.search);
        this.props.fetchSearchResults(values.q);
        
    }

    renderList() {
    
       if(!_.isEmpty(this.props.searchResults.data)){
           return Object.keys(this.props.searchResults.data).map(result => {
                const sermon = this.props.searchResults.data[result];
                return (
                    <SermonListItem key={sermon.title} sermon={sermon} />
                )
           })
       } 
    }

    render(){
        return(
            <div>
                <h2>Search Results</h2>
                {this.renderList()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        searchResults: state.searchResults
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


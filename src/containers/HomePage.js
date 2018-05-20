import React, {Component} from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux'
import MostRecentSeriesGrid from './most_recent_series_grid'
import SearchBar from '../components/search_bar'
import AudioSearchService from '../services/audio-search-service'

import _ from 'lodash';

const audioSearchService = new AudioSearchService();
class HomePage extends Component{

    componentWillMount() {
       // this.props.mostRecentSeries = [];

        //this.props.getMostRecentSeries();

        
    }

    

    render(){
        const audioSearchDebounced =  _.debounce((term) => { this.audioSearch(term) }, 300);

        return(
            <div className="App">
                <header className="App-header">

                </header>
                <div className="hero-unit">
                    <div className="hero-title">
                        <h2>Faith Bible Church Audio Archive</h2>
                        <h5>Explore Audio tracks from Faith Bible Church</h5>
                        <div className="hero-button">
                            <div>Register for the Podcast</div>
                        </div>
                    </div>

                </div>
                <div className="searchWrapper">
                    <SearchBar onSearchTermChanged={audioSearchDebounced} />
                </div>

                <div className="mostRecent">
                    <MostRecentSeriesGrid />
                </div>


            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        searchResults: state.searchResults,
        searchQuery: state.searchQuery
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch);
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);            


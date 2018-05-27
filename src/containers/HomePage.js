import React, {Component} from 'react';
import { connect } from 'react-redux';
import '../App.css';
import '../css/Home.css'
import { bindActionCreators } from 'redux'
import MostRecentSeriesGrid from './most_recent_series_grid'
import SearchBar from '../components/search_bar'
import Header from '../components/header'
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
            <div>
                <Header/>
                <div className="App">

                    <div className="hero-unit">
                        <div className="hero-title">
                            <h1>Faith Bible Church Media</h1>
                            <p className='hero-subheading'>Explore media from Faith Bible Church</p>
                            <div className='searchBarWrapper'>
                                <SearchBar onSearchTermChanged={audioSearchDebounced} />
                            </div>
                        </div>

                    </div>

                    <div className="mostRecent">
                        <MostRecentSeriesGrid />
                    </div>


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


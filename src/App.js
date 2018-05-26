import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/search_bar'
import SermonList from './components/sermon_list'
import SermonDetail from './components/sermon_detail'
import AudioSearchService from './services/audio-search-service'
import SearchResultList from './containers/search_results_list'
import MostRecentSeriesGrid from './containers/most_recent_series_grid'

import _ from 'lodash';

// import route Components here
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'


class App extends Component {
  constructor(props){
    super(props);

    this.state = { 
      selectedSermon: null,
      audioResults: [] 
    };
    
    this.audioSearchService = new AudioSearchService();


  }

  audioSearch(term) {
    this.audioSearchService.freeTextSearch(term, 0, 10)
      .then((searchResult) => {
        console.log(searchResult);
        this.setState({audioResults: searchResult.data.content});
      });
  }

  getMostRecent(count){
    this.audioSearchService.getMostRecentSerieses(count)
      .then((results) => {
        if(results != null && results.data != null){
          this.setState({ 
              audioResults: results.data,
              selectedSermon: results.data[0],
            });
        }
      });
  }



  render() {
      const audioSearchDebounced =  _.debounce((term) => { this.audioSearch(term) }, 300);

    return (
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
          <SearchBar onSearchTermChanged={audioSearchDebounced}/>
        </div>

        <div className="mostRecent">
            <SermonList sermons={this.state.audioResults}/>
            <MostRecentSeriesGrid />
        </div>


      </div>
        
    );
  }
}

export default App;

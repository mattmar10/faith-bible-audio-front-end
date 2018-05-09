import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/search_bar'
import SermonList from './components/sermon_list'
import AudioSearchService from './services/audio-search-service'

class App extends Component {
  constructor(props){
    super(props);

    this.state = { audioResults: [] };
    this.audioSearchService = new AudioSearchService();

    this.getMostRecent(1);

  }

  audioSearch(term) {
    this.audioSearchService.freeTextSearch(term, 0, 10)
      .then((searchResult) => {
        this.setState({audioResults: searchResult.data.content});
      });
  }

  getMostRecent(count){
    this.audioSearchService.getMostRecent(count)
      .then((results) => {
        console.log(results);
        this.setState({audioResults: results.data});
      });
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <div>
          <SearchBar onSearchTermChanged={term => this.audioSearch(term)}/>
        </div>
        <div>
          <SermonList sermons={this.state.audioResults}/>
        </div>
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import { connect } from 'react-redux';

import SeriesGridItem from '../components/series_grid_item'
import { mostRecentSeriesLoaded } from '../actions/index'
import { bindActionCreators } from 'redux'

import AudioSearchService from '../services/audio-search-service'

const audioSearchService = new AudioSearchService();
class MostRecentSeriesGrid extends Component{

    componentWillMount() {
       // this.props.mostRecentSeries = [];

        this.props.getMostRecentSeries();

        
    }

    renderGrid() {
        return this.props.mostRecentSeries.map((result) => {
            return (
                <SeriesGridItem key={result.title} series={result} />
            )
        });
    }

    render(){
        return(
            <div>
                <h2>Recent Series</h2>
                <ul className="most-recent-list col-sm-4">
                    {this.renderGrid()}
                </ul>
            </div>
        );
    }
}




function mapStateToProps(state){
    console.log(state);
    return{
        mostRecentSeries: state.mostRecentSeries
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getMostRecentSeries: mostRecentSeriesLoaded}, dispatch);
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MostRecentSeriesGrid);            

import React, {Component} from 'react';
import { connect } from 'react-redux';

import SeriesGridItem from '../components/series_grid_item'
import { mostRecentSeriesLoaded } from '../actions/index'
import { bindActionCreators } from 'redux'

import AudioSearchService from '../services/audio-search-service'

import _ from 'lodash'

const audioSearchService = new AudioSearchService();
class MostRecentSeriesGrid extends Component{

    componentWillMount() {
        this.props.getMostRecentSeries(6);
    }

    renderGrid() {

        if(this.props.mostRecentSeries.error){
            return(<div>{this.props.mostRecentSeries.errorMessage}</div>);
        }
        else if(!_.isEmpty(this.props.mostRecentSeries.data)){
            return this.props.mostRecentSeries.data.map((result) => {
                return (
                    <SeriesGridItem key={result.title} series={result} />
                )
            });
        }
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
    return{
        mostRecentSeries: state.mostRecentSeries
    };
}

/*function mapDispatchToProps(dispatch){
    return bindActionCreators({getMostRecentSeries: mostRecentSeriesLoaded}, dispatch);
}*/

function mapDispatchToProps (dispatch) {
    
    return { 
        getMostRecentSeries: (count) => dispatch(audioSearchService.getMostRecentSeries(count))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MostRecentSeriesGrid);            

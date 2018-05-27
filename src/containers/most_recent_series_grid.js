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

            const mapped = this.props.mostRecentSeries.data;

            return(
                <div className="most-recent-row">
                    <div className='most-recent-column'>
                        <SeriesGridItem series={mapped[0]} />
                        <SeriesGridItem series={mapped[3]} />
                    </div>
                    <div className='most-recent-column'>
                        <SeriesGridItem series={mapped[1]} />
                        <SeriesGridItem series={mapped[4]} />
                    </div>
                    <div className='most-recent-column'>
                        <SeriesGridItem series={mapped[2]} />
                        <SeriesGridItem series={mapped[5]} />
                    </div>
                </div>
            );

        }
    }

    render(){
        return(
            <div className="most-recent-wrapper">
                <h3>Recent Series</h3>

                {this.renderGrid()}
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

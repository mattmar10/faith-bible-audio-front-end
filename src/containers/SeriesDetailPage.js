import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import AudioSearchService from '../services/audio-search-service'


class SeriesDetailPage extends Component{

    componentWillMount() {
        const seriesId = this.props.match.params['seriesId']
        this.props.getSeriesDetails(seriesId);
    }

    render(){

        if(this.props.seriesDetails.error){
            return(<div>{this.props.seriesDetails.errorMessage}</div>);
        }
        else{
            const series = this.props.seriesDetails.series

            if(series){
                return(
                    <div>
                        <h2>Series Detail Page</h2>
                        <h3>{series.title}</h3>
                    </div>
                );
            }
            else{
                return(
                    <div>
                        <h2>Series Detail Page</h2>
                    </div>
                );
            }
            
        }
    }
}

const audioSearchService = new AudioSearchService();
function mapStateToProps(state){
    return{
        seriesDetails: state.seriesDetails
    };
}

function mapDispatchToProps(dispatch){
    return { 
        getSeriesDetails: (seriesId) => dispatch(audioSearchService.getSeriesDetails(seriesId))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SeriesDetailPage);            


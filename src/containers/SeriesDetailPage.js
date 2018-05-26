import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import AudioSearchService from '../services/audio-search-service'
import SermonList from '../components/sermon_list'
import Header from '../components/header'
import _ from 'lodash'

class SeriesDetailPage extends Component{

    componentWillMount() {
        const seriesId = this.props.match.params['seriesId']
        this.props.getSeriesDetails(seriesId);
    }

    renderSeries(){
        if(this.props.seriesDetails.error){
            return(<div>{this.props.seriesDetails.errorMessage}</div>);
        }
        else{
            const series = this.props.seriesDetails.series

            if(series){
                const sermonsList = _.values(series.sermons)
                const imageURL = series.imageURI != null ? series.imageURI : "http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Headphones-Apollo-icon.png";
    
                return (
                    <div className='container-fluid'>
                        <div className='seriesBanner'>
                            <div className='row vertical-align'>

                                <div className='col-sm-5 seriesBannerTitle'>
                                    <h2>{series.title}</h2>
                                    <p>Some text here.</p>
                                </div>
                                <div className='col-sm-7 '>
                                    <img className='img-fluid' src={imageURL} />
                                </div>

                            </div>
                        </div>
                        <div className='row seriesContent'>

                            <div className='col-sm-8 seriesSermonList' >
                                <h3>Messages</h3>
                                <SermonList sermons={sermonsList}/>
                            </div>

                            <div className='col-sm-3 seriesRelated' >
                                Content here
                            </div>
                        </div>
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

    render(){

        return(
            <div>
                <Header/>
                <div className='App'>

                    {this.renderSeries()}
                </div>
            </div>
        );

        
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


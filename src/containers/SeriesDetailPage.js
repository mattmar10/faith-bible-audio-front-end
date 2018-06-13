import React, {Component} from 'react';
import { connect } from 'react-redux';
import AudioSearchService from '../services/audio-search-service'
import SermonList from '../containers/sermon_list_container'
import SeriesBanner from '../components/series_banner'
import Header from '../components/header'
import _ from 'lodash'

import loading from '../images/ajax-loader.gif'

class SeriesDetailPage extends Component{

    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth,
        };

        this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);

        const seriesId = this.props.match.params['seriesId']
        this.props.getSeriesDetails(seriesId);
    }

    // make sure to remove the listener
    // when the component is not mounted anymore
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }


    handleWindowSizeChange(){
        var w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

        this.setState({width: width, height: height});
    }


    renderSeries(isMobile: boolean){
        if(this.props.seriesDetails.error){
            return(<div>{this.props.seriesDetails.errorMessage}</div>);
        }
        else{
            const series = this.props.seriesDetails.series

            if(series){
                const sermonsList = _.values(series.sermons)
                const imageURL = series.imageURI != null ? series.imageURI : "http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Headphones-Apollo-icon.png";
    
                return (
                    <div >
                        <SeriesBanner series={series} isMobile={isMobile}/>

                        <div className='row seriesContent'>

                            <div className='seriesSermonList' >
                                <SermonList sermons={sermonsList} isMobile={isMobile}/>
                            </div>


                        </div>
                    </div>

                    
                );
            }
            else{
                return(
                    <div>
                        <img src={loading} />
                    </div>
                );
            }
            
        }
    }

    render(){

        const { width } = this.state;
        const isMobile = width <= 768;

        return(
            
            <div style={{paddingBottom: '75px'}}>
                <Header/>
                {this.renderSeries(isMobile)}
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


import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import '../App.css'
import Header from '../components/header'
import SermonBanner from '../components/sermon_banner'
import loading from '../images/ajax-loader.gif'
import MiniSermonList from '../containers/mini_sermon_list_container'
import SermonService from '../services/sermon-service'
import AudioSearchService from '../services/audio-search-service'
import * as actions from "../actions";
import _ from "lodash";


class SermonDetailPage extends Component{

    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth,
            playing: false
        };

        this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
        this.favoriteSermonHandler = this.favoriteSermonHandler.bind(this);
    }

    componentWillMount() {
        this.props.clear();
        const sermonSlug = this.props.match.params['sermonSlug']
        this.props.getSermonDetails(sermonSlug);
    }

    componentDidUpdate(){
        if(this.props.sermonDetails.sermon && !this.state.playing){
            this.props.playSermon(this.props.sermonDetails.sermon);

            this.setState(...this.state, {playing: true});
        }
    }

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

        this.setState(...this.state, {width: width, height: height});
    }

    favoriteSermonHandler(sermonId: string){
        if(!this.props.favoriteSermons.sermons || !this.props.favoriteSermons.sermons.includes(sermonId)){
            this.props.favoriteSermon(sermonId);
        }
    }

    renderMobile(sermon: Object){

        const mobStyles = {
            sermonDetailPage: {
              fontFamily: 'Roboto, sans-serif'
            },
            wrapper: {
                textAlign: 'left',
                paddingLeft: '20px'
            },
            speaker: {
                color: '#666666',
                textAlign:'left',
                paddingLeft: '15px',
                fontSize: '13px'
            },
            date: {
                color: '#888888',
                textAlign:'left',
                paddingLeft: '15px',
                fontSize: '12px'
            },
            speakerDateWrapper:{
                display: 'flex',
                justifyContent: "space-between",
            },
            socialActionsWrapper: {
                marginTop: "10px",
                paddingTop: "10px",
                color: "#555555",
                display: "flex",
                alignItems: "center",
                height: "50px",
                justifyContent: "space-between",
                paddingLeft: "35px",
                paddingRight: "35px",
                borderTop: "1px solid #f2f2f2",
                borderBottom: "1px solid #f2f2f2"
            },
            socialActionButton:{
                fontSize: "18px",
                color: "#999999",
                paddingTop: "5px"
            },
            actionDescription: {
                fontSize: "12px",
                textAlign: "center"
            },
            header: {
                textAlign: 'left',
                paddingLeft: '15px',
                paddingRight: '15px',
                paddingTop: '15px',
                fontSize: '15px',
            },
            otherSeriesWrapper: {
                paddingLeft: '25px',
                paddingRight: '25px',
                marginTop: '-5px'
            }
        }

        let otherSermons = []
        if(this.props.seriesDetails.series){
            otherSermons = _.values(this.props.seriesDetails.series.sermons)
            _.remove(otherSermons, (item) => item.id === sermon.id);
        }

        const playCount = sermon.stats != null ? sermon.stats.plays : 1;
        let playCountText = playCount == 0 ? "" : `${playCount} play`;

        if(playCount > 1){
            playCountText += 's'
        }

        const favoriteIcon = (this.props.favoriteSermons.sermons && this.props.favoriteSermons.sermons.includes(sermon.id)) ? 
            <i className="fa fa-heart"></i> : 
            <i className="fa fa-heart-o"></i>;

        return(
            <div style={mobStyles.sermonDetailPage}>
                <SermonBanner sermon={sermon} isMobile={true}/>
                <div style={mobStyles.speakerDateWrapper}>

                </div>
                <div style={mobStyles.speaker}>{sermon.speaker}</div>
                <div style={{display: 'flex', justifyContent: 'space-between', paddingRight: '15px'}}>
                    <div style={mobStyles.date}>{sermon.date}</div>
                    <div style={mobStyles.date} onClick= {() => this.props.showPlayer()}>
                        <i className="fas fa-headphones" aria-hidden="true"></i>
                        <span style={{paddingLeft: '3px'}}> {playCount}</span>
                    </div>
                </div>

                <div style={mobStyles.socialActionsWrapper}>
                    <div style={mobStyles.socialActionButton} onClick={() => this.favoriteSermonHandler(sermon.id)}>
                        {favoriteIcon}
                        <p style={mobStyles.actionDescription}>Favorite</p>
                    </div>
                    <div style={mobStyles.socialActionButton}><i className="fas fa-share"></i><p style={mobStyles.actionDescription}>Share</p></div>
                    <a href={sermon.mp3URI} download={`${sermon.title}.mp3`} target={'blank'}>
                        <div style={mobStyles.socialActionButton}>
                            <i className="fas fa-download"></i>
                            <p style={mobStyles.actionDescription}>Audio Download</p>
                        </div>
                    </a>
                    <a href={sermon.pdfURI}>
                        <div style={mobStyles.socialActionButton}>
                            <i className="fas fa-file"></i><p style={mobStyles.actionDescription}>Notes</p>
                        </div>
                    </a>
                </div>
                <div style={{backgroundColor: "#fafafa"}}>
                    <div style={mobStyles.header}>More from:
                        <span style={{fontWeight: '700'}}>&nbsp;{sermon.series}</span>
                    </div>
                    <div style={mobStyles.otherSeriesWrapper}>
                        <MiniSermonList sermons={otherSermons} isMobile={true}/>
                    </div>
                </div>
            </div>
        );
    }

    renderDesktop(sermon: Object){

        const desktopStyles = {
            bottomWrapper: {
                display: 'flex',
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingTop: '15px',
                justifyContent: 'space-between',
                fontFamily: 'Roboto, sans-serif'
            },
            leftColumn: {
                textAlign: 'left',
                flex: 2
            },
            rightColumn: {
                textAlign: 'left',
                flex: 1,
                borderLeft: '1px solid #f2f2f2',
                marginLeft: '15px',
                paddingLeft: '10px'
            },
            sermonTitle: {
                fontWeight: 500,
                fontSize: '22px'
            },
            sermonSpeaker: {
                paddingTop: '5px',
                color: '#888888',
                fontSize: '14px'
            },
            socialActionsWrapper: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            socialActionsLeft:{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '3px'
            },
            socialActionsRight:{
                display: 'flex',
                justifyContent: 'space-between',                
            },
            socialActionButtonLeft:{
                fontSize: "14px",
                color: "#999999",
                cursor: 'pointer'
            },
            socialActionButton:{
                fontSize: "14px",
                color: "#999999",
                marginLeft: '10px',
            },
            actionDescription: {
                fontSize: "12px",
                marginLeft: '5px'
            },
            header: {
                textAlign: 'left',
                paddingRight: '10px',
                marginTop: '15px',
                borderTop: '1px solid #f2f2f2',
                paddingTop: '15px',
                fontSize: '18px',
                fontWeight: 500
            },
            btnLabel: {
                fontSize: '12px',
                fontWeight: 500,
                marginLeft: '7px',
                color: "#888888"
            },
            rightHeader: {
                fontWeight: 400,
                fontSize: '18px'
            },
        }

        const favoriteIcon = (this.props.favoriteSermons.sermons && this.props.favoriteSermons.sermons.includes(sermon.id)) ? 
            <i className="fas fa-thumbs-up"></i> : 
            <i className="far fa-thumbs-up"></i>;

        const playCount = sermon.stats != null ? sermon.stats.plays : 1;
        const favoriteCount = sermon.stats != null ? sermon.stats.likes : "Be the First";
        
        let otherSermons = []
        if(this.props.seriesDetails.series){
            otherSermons = _.values(this.props.seriesDetails.series.sermons)
            _.remove(otherSermons, (item) => item.id === sermon.id);
        }

        return(
            <div>
                <SermonBanner sermon={sermon} isMobile={false}/>
                <div style={desktopStyles.bottomWrapper}>
                    <div style={desktopStyles.leftColumn}>
                        <div style={{paddingBottom: '5px'}}>
                            <div style={desktopStyles.sermonTitle}>{sermon.title}</div>
                            <div style={desktopStyles.sermonSpeaker}>
                                <div>{sermon.speaker} | {sermon.date}</div>
                            </div>
                        </div>
                        <div style={desktopStyles.socialActionsWrapper}>
                            <div style={desktopStyles.socialActionsLeft}>
                                <div style={desktopStyles.socialActionButtonLeft} onClick={() => this.favoriteSermonHandler(sermon.id)}>
                                    {favoriteIcon}
                                    <span style={desktopStyles.actionDescription}>{favoriteCount}</span>
                                </div>
                                <div style={desktopStyles.socialActionButton} onClick= {() => this.props.showPlayer()}>
                                    <i className="fas fa-headphones" aria-hidden="true"></i>
                                    <span style={desktopStyles.actionDescription}> {playCount}</span>
                                </div>                                       
                            </div>
                            <div style={desktopStyles.socialActionsRight}>
                                <div> 
                                    <a href={sermon.pdfURI}>
                                        <button className="btn">
                                            <i className="fas fa-file" style={{color: "#888888"}}></i>
                                            <span style={desktopStyles.btnLabel}>Sermon Notes</span>
                                        </button>
                                    </a>
                                </div>
                                <div>
                                    <a href={sermon.mp3URI} download={`${sermon.title}.mp3`} target={'blank'}>
                                        <button className="btn">
                                            <i className="fas fa-download" style={{color: "#888888"}} ></i>
                                            <span style={desktopStyles.btnLabel}>Audio Download</span>
                                        </button>
                                    </a>
                                </div>
                            </div>

                        </div>
                        <div>
                            <div style={desktopStyles.header}>More from: {sermon.series}
                            
                            </div>
                            <MiniSermonList sermons={otherSermons} isMobile={true}/>
                        </div>
                    </div>
                    <div style={desktopStyles.rightColumn}>
                        <div style={desktopStyles.rightHeader}>Related Content</div>
                    </div>
                </div>
                
            </div>
        );
    }

    renderSermon(isMobile: boolean){

        if(this.props.sermonDetails.error){
            return(<div>{this.props.sermonDetails.errorMessage}</div>);
        }
        else{
            const sermon = this.props.sermonDetails.sermon

            if(sermon){
                if(isMobile){
                    return this.renderMobile(sermon);
                }
                else{
                    return this.renderDesktop(sermon);
                }
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
                {this.renderSermon(isMobile)}
            </div>

        );


    }
}


const sermonService = new SermonService();
const audioSearchService = new AudioSearchService();
function mapStateToProps(state){
    return{
        sermonDetails: state.sermonDetails,
        seriesDetails: state.seriesDetails,
        favoriteSermons: state.favoriteSermons
    };
}

function mapDispatchToProps(dispatch){
    return { 
        getSermonDetails: (sermonSlug) => dispatch(sermonService.getSermonDetailsBySlug(sermonSlug)),
        clear: () => dispatch(actions.clearSermonDetails()),
        playSermon: (sermon) => {
            dispatch(actions.showAudioPlayer(true));
            dispatch(actions.playSermonAudio(sermon));
            dispatch(audioSearchService.getSeriesDetails(sermon.seriesSlug));
        },
        showPlayer: () => dispatch(actions.showAudioPlayer(true)),
        favoriteSermon: (sermonId) => {
            dispatch(actions.favoriteSermon(sermonId));
            dispatch(sermonService.incrementFavoriteCount(sermonId));
        }
    }
}


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SermonDetailPage));


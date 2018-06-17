import React, {Component} from 'react';
import {connect} from "react-redux";
import '../css/Footer.css'
import logo from '../images/FBC_Logo.png'
import SermonService from "../services/sermon-service";
import * as actions from "../actions/index"

class FooterPlayer extends Component {
    constructor(props) {
        super(props);

        this.toggleFooterHeight = this.toggleFooterHeight.bind(this);
        this.togglePlayPause = this.togglePlayPause.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            duration: 0,
            currentTime: 0,
            width: window.innerWidth,
            collapsed: false,
            playing: false
        }
    }

    handlePlay() {
        this.setState(...this.state, {playing: true})
        this.audio.play();
    }

    handleStop() {
        //this.audio.currentTime = 0;
        this.audio.pause();
        this.setState(...this.state, {playing: false})
    }


    seekToTime(e) {
        this.audio.currentTime = e.target.value;

    }

    componentDidUpdate() {

        if (this.audio) {
            this.audio.onplay = () => {
                this.currentTimeInterval = setInterval(() => {
                    this.setState( ...this.state, {duration: this.audio.duration, currentTime: this.audio.currentTime});
                }, 500);
                this.setState(...this.state, {playing: true});
                this.props.updatePlayCount(this.props.sermon.id);
            };

        }
    }

    componentWillUnmount() {
        clearInterval(this.currentTimeInterval);
        //this.audio = null;
    }

    toggleFooterHeight(){

        this.setState({collapsed: !this.state.collapsed})
    }

    togglePlayPause(){
        if(this.state.playing){
            this.handleStop()
        }
        else {
            this.handlePlay()
        };
    }

    handleClose(){
        this.handleStop();
        this.props.hideAudioPlayer();
    }


    renderMobileFooter(currentDisplay, durationDisplay){
        const src = this.props.audioURL;
        var title = this.props.sermon.title;

        var heightStyle = this.state.collapsed ?  {height: '47px'} : {height: '80px'};
        var displayStyle = this.props.showAudioPlayer ? {visibility: 'visible'} : {visibility: 'hidden'};
        const mergedStyle = Object.assign({}, heightStyle, displayStyle);
        const toggleText = this.state.collapsed ? "expand_less" : "expand_more";
        const playPauseToggle = this.state.playing ? "pause_circle_outline" : "play_circle_outline";

        return(
            <div id='stickyFooterMobile' style={mergedStyle}>
                <div>
                    <div className={"playerWrapperMobile"}>
                        <div className={"controlsMobile"}>
                            <i className="material-icons md-50" onClick={this.togglePlayPause}>{playPauseToggle}</i>
                        </div>

                        <div className={"playerSermonDetailsMobile"}>
                            <div className={'playerSeries'}>{this.props.sermon.series} ({this.props.sermon.date})</div>
                            <div className='playerTitle'>{title}</div>
                            <div className={'playerSpeaker'}>{this.props.sermon.speaker}</div>

                        </div>


                        <div className={"playerExpandToggle"}>
                            <i className="material-icons  md-32" onClick={this.toggleFooterHeight}>
                                {toggleText}
                            </i>
                            <i className="material-icons md-22" onClick={this.handleClose}>
                                close
                            </i>
                        </div>



                    </div>
                    <div className={"playerMobileControlsWrapper"}>

                        <div className={"audio"}>
                            <audio ref={(audio) => {
                                this.audio = audio
                            }} src={src} autoPlay={false}/>
                        </div>
                        <div className={"currentTime"}>{currentDisplay}</div>
                        <div className={"progressBar"}>

                            <p><input ref={(slider) => {this.slider = slider}}
                                      type="range"
                                      name="points"
                                      value={this.state.currentTime}
                                      onChange={this.seekToTime.bind(this)}
                                      min="0" max={this.state.duration || 0}/></p>
                        </div>
                        <div className={"duration"}>{durationDisplay}</div>
                    </div>
                </div>


            </div>
        );
    }

    renderDesktopFooter(currentDisplay, durationDisplay){

        const src = this.props.audioURL;
        const imageURL = this.props.sermon.imageURI != null ? this.props.sermon.imageURI : "http://faithbibleok.com/wp-content/uploads/FB-Logo-2.png";
        const playPauseToggle = this.state.playing ? "pause_circle_outline" : "play_circle_outline";
        const displayStyle = this.props.showAudioPlayer ? {visibility: 'visible'} : {visibility: 'hidden'};
        return (
            <div id='stickyFooter' style={displayStyle}>

                <div className={"playerWrapper"}>
                    <div className={"playerImg"}>
                        <img className='img-fluid' src={imageURL}/>
                    </div>
                    <div className={"playerSermonDetails"}>
                        <div className={'playerSeries'}>{this.props.sermon.series} ({this.props.sermon.date})</div>
                        <div className='playerTitle'>{this.props.sermon.title}</div>
                        <div className={'playerSpeaker'}>{this.props.sermon.speaker}</div>

                    </div>

                    <div className={"socialActions"}>

                    </div>

                    <div className={"controls"}>
                        <i className="material-icons md-50" onClick={this.togglePlayPause}>{playPauseToggle}</i>
                    </div>

                    <div className={"audio"}>
                        <audio ref={(audio) => {
                            this.audio = audio
                        }} src={src} autoPlay={false}/>
                    </div>

                    <div className={"currentTime"}>{currentDisplay}</div>
                    <div className={"progressBar"}>

                        <p><input ref={(slider) => {this.slider = slider}}
                                type="range"
                                name="points"
                                value={this.state.currentTime}
                                onChange={this.seekToTime.bind(this)}
                                min="0" max={this.state.duration || 0}/></p>
                    </div>
                    <div className={"duration"}>{durationDisplay}</div>


                    <div className={"playerClose"}>

                            <i className="material-icons md-22" onClick={this.handleClose}>
                                close
                            </i>
                        </div>
                </div>
            </div>


        );
    }


    render() {

        function pad(str, size = 2) {
            while (str.length < (size)) {
                str = "0" + str;
            }
            return str;
        }

        const { width } = this.state;
        const isMobile = width <= 768;

        var current_min = Math.floor(this.state.currentTime / 60);
        var current_seconds = Math.round((this.state.currentTime - current_min * 60));
        var currentDisplay = `${pad(current_min.toString())}:${pad(current_seconds.toString())}`;

        const duration = !isNaN(this.state.duration) ? this.state.duration : 0;

        var duration_min = Math.floor(duration / 60);
        var duration_seconds = Math.round((duration - duration_min * 60));
        var durationDisplay = `${pad(duration_min.toString())}:${pad(duration_seconds.toString())}`;


        if (this.props.sermon) {
            if(isMobile){
                return this.renderMobileFooter(currentDisplay, durationDisplay);
            }
            else{
                return this.renderDesktopFooter(currentDisplay, durationDisplay);
            }
        }
        else {
            return (<div></div>);
        }
    }
}


const sermonService = new SermonService();

function mapStateToProps(state) {

    const audioUrl = state.sermonForAudio.sermon != null ? state.sermonForAudio.sermon['mp3URI'] : null;

    return {
        sermon: state.sermonForAudio.sermon,
        audioURL: audioUrl,
        showAudioPlayer: state.showAudioPlayer.value
    };
}


function mapDispatchToProps(dispatch) {

    return {
        hideAudioPlayer: () => dispatch(actions.showAudioPlayer(false)),
        updatePlayCount: (id) => dispatch(sermonService.incrementPlayCount(id)),
        updateLikeCount: (id) => dispatch(sermonService.incrementLikeCount(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterPlayer);
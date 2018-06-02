import React, {Component} from 'react';
import {connect} from "react-redux";
import '../css/Footer.css'
import logo from '../images/FBC_Logo.png'

class FooterPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            duration: null,
            currentTime: 0,
            width: window.innerWidth,
        }
    }

    handlePlay() {


        this.audio.play();


    }

    handleStop() {
        //this.audio.currentTime = 0;
        this.audio.pause();
    }


    seekToTime(e) {
        this.audio.currentTime = e.target.value;

    }

    componentDidUpdate() {

        if (this.audio) {
            this.audio.onplay = () => {
                this.currentTimeInterval = setInterval(() => {
                    this.setState({duration: this.audio.duration, currentTime: this.audio.currentTime});
                }, 500);
            };

        }
    }

    componentWillUnmount() {
        clearInterval(this.currentTimeInterval);
        //this.audio = null;
    }

    renderMobileFooter(currentDisplay, durationDisplay){
        const src = this.props.sermon['mp3URI'];
        const imageURL = this.props.sermon.imageURI != null ? this.props.sermon.imageURI : "http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Headphones-Apollo-icon.png";


        var title = (this.props.sermon.title.length > 45) ?
            this.props.sermon.title.substring(0, 45) + "..." :
            this.props.sermon.title;

        return(
            <div id='stickyFooterMobile'>
                <div>
                    <div className={"playerWrapperMobile"}>
                        <div className={"playerImg"}>
                            <img className='img-fluid' src={imageURL}/>
                        </div>

                        <div>

                            <div className={"playerSermonDetails"}>
                                <div className={'playerSeries'}>{this.props.sermon.series}</div>
                                <div className='playerTitle'>{title}</div>
                                <div className={'playerSpeaker'}>{this.props.sermon.speaker}</div>

                            </div>

                        </div>

                    </div>
                    <div className={"playerMobileControlsWrapper"}>
                        <div className={"controlsMobile"}>
                            <i className="material-icons md-22" onClick={this.handlePlay.bind(this)}>play_circle_outline</i>
                            <i className="material-icons md-22" onClick={this.handleStop.bind(this)}>pause</i>
                        </div>
                        <div className={"audio"}>
                            <audio ref={(audio) => {
                                this.audio = audio
                            }} src={src} autoPlay={true}/>
                        </div>
                        <div className={"currentTime"}>{currentDisplay}</div>
                        <div className={"progressBar"}>

                            <p><input ref={(slider) => {
                                this.slider = slider
                            }}
                                      type="range"
                                      name="points"
                                      value={this.state.currentTime}
                                      onChange={this.seekToTime.bind(this)}
                                      min="0" max={this.state.duration}/></p>
                        </div>
                        <div className={"duration"}>{durationDisplay}</div>
                    </div>
                </div>


            </div>
        );
    }

    renderDesktopFooter(currentDisplay, durationDisplay){

        const src = this.props.sermon['mp3URI'];
        const imageURL = this.props.sermon.imageURI != null ? this.props.sermon.imageURI : "http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Headphones-Apollo-icon.png";

        return (
            <div id='stickyFooter'>

                <div className={"playerWrapper"}>
                    <div className={"playerImg"}>
                        <img className='img-fluid' src={imageURL}/>
                    </div>
                    <div className={"playerSermonDetails"}>
                        <div className={'playerSeries'}>{this.props.sermon.series} ({this.props.sermon.date})</div>
                        <div className='playerTitle'>{this.props.sermon.title}</div>
                        <div className={'playerSpeaker'}>{this.props.sermon.speaker}</div>

                    </div>
                    <div className={"controls"}>
                        <i className="material-icons" onClick={this.handlePlay.bind(this)}>play_circle_outline</i>
                        <i className="material-icons" onClick={this.handleStop.bind(this)}>pause</i>
                    </div>

                    <div className={"audio"}>
                        <audio ref={(audio) => {
                            this.audio = audio
                        }} src={src} autoPlay={true}/>
                    </div>

                    <div className={"currentTime"}>{currentDisplay}</div>
                    <div className={"progressBar"}>

                        <p><input ref={(slider) => {
                            this.slider = slider
                        }}
                                  type="range"
                                  name="points"
                                  value={this.state.currentTime}
                                  onChange={this.seekToTime.bind(this)}
                                  min="0" max={this.state.duration}/></p>
                    </div>
                    <div className={"duration"}>{durationDisplay}</div>
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

        var duration_min = Math.floor(this.state.duration / 60);
        var duration_seconds = Math.round((this.state.duration - duration_min * 60));
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

function mapStateToProps(state) {

    return {
        sermon: state.sermonForAudio.sermon
    };
}


function mapDispatchToProps(dispatch) {

    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterPlayer);
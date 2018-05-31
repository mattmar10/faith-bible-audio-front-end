import React, { Component } from 'react';
import {connect} from "react-redux";
import '../css/Footer.css'

class FooterPlayer extends Component {
    constructor(props){
        super(props);

        this.state = {
            duration: null,
            currentTime: 0
        }
    }

    handlePlay() {



        this.audio.play();


    }

    handleStop() {
        //this.audio.currentTime = 0;
        this.slider.value = 0;
        this.audio.pause();
    }


    seekToTime(e){
        console.log(e.target.value);
        this.audio.currentTime = e.target.value;

    }

    componentDidUpdate(){

        if(this.audio){
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
    componentDidMount() {
            /*this.currentTimeInterval = null;

            // Get duration of the song and set it as max slider value
            this.audio.onloadedmetadata = function () {
                this.setState({duration: this.audio.duration});
            }.bind(this);

            // Sync slider position with song current time
            this.audio.onplay = () => {
                this.currentTimeInterval = setInterval(() => {
                    this.slider.value = this.audio.currentTime;
                }, 500);
            };

            this.audio.onpause = () => {
                clearInterval(this.currentTimeInterval);
            };

            // Seek functionality
            this.slider.onchange = (e) => {

                clearInterval(this.currentTimeInterval);
                this.audio.currentTime = e.target.value;
            };*/


    }

    render(){


        if(this.props.sermon) {
            const src = this.props.sermon['mp3URI'];


            return (
                <div id='stickyFooter'>
                    <i className="material-icons" onClick={ this.handlePlay.bind(this) }>play_circle_outline</i>
                    <i className="material-icons" onClick={ this.handleStop.bind(this) }>pause</i>

                    <audio ref={(audio) => { this.audio = audio }} src={src} autoPlay={true}/>

                    <p><input ref={(slider) => {
                        this.slider = slider }}
                              type="range"
                              name="points"
                              value={this.state.currentTime}
                              onChange={this.seekToTime.bind(this)}
                              min="0" max={this.state.duration} /> </p>
                </div>


            );
        }
        else{
            return(<div></div>);
        }
    }
}

function mapStateToProps(state) {

    return {
        sermon: state.sermonForAudio.sermon
    };
}


function mapDispatchToProps (dispatch) {

    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterPlayer);
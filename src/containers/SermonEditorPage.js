
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SermonEditor from '../components/sermon_editor'
import SermonService from '../services/sermon-service'
import AudioFileService from "../services/audio-file-service";
import {initialize} from 'redux-form';

class SermonEditorPage extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            width: window.innerWidth
        }
        
    }

    componentDidMount() {
        const sermonSlug = this.props.match.params['sermonSlug']
        
        this.props.loadSeries();
        this.props.loadSermons();
        this.props.loadAudioFiles();
        this.props.getSermonDetails(sermonSlug);


    }

    componentDidUpdate(prevProps) {

        const sermonSlug = this.props.match.params['sermonSlug']
        //this.props.getSermonDetails(sermonSlug);

        if(prevProps && prevProps.sermonDetails && prevProps.sermonDetails.sermon){
            const previousSlug = prevProps.sermonDetails.sermon.slug;
            if(previousSlug != sermonSlug){
                this.props.getSermonDetails(sermonSlug);
            }
        }

    }


    render(){
        let doneLoading = this.props.sermonDetails && this.props.allSeries && this.props.allSpeakers;

        if(!doneLoading){
            return(<div>Loading</div>);
        }
        else{
            return(
                <SermonEditor 
                    allSeries={this.props.allSeries} 
                    speakers={this.props.allSpeakers}
                    sermon={this.props.sermonDetails.sermon} 
                    />
            );
        }

    }
}

const sermonService = new SermonService();
const audioFilesService = new AudioFileService();

function mapStateToProps(state) {
    return {
        sermonDetails: state.sermonDetails,
        allSpeakers: state.allSermons.speakers,
        allSeries: state.allSeries.series,
        allAudioFiles: state.allAudioFiles.audioFiles,
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getSermonDetails: (sermonSlug) => {
            dispatch(sermonService.getSermonDetailsBySlug(sermonSlug));
        },
        loadSermons: () => dispatch(sermonService.loadAllSermons()),
        loadSeries: () => dispatch(sermonService.loadAllSeries()),
        loadAudioFiles: () => dispatch(audioFilesService.loadAllAudioFiles()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SermonEditorPage);
import React from 'react';
import { withRouter, Link } from "react-router-dom";
import {connect} from "react-redux";

import AddEditSermon from "../components/add_edit_sermon";
import SermonService from "../services/sermon-service";


class SermonEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };

    }


    handleSubmit(data) {
        console.log(this.props.sermon.id);
        console.log(JSON.stringify(data, null, 2));
        
        const tags = (data.tags) ? data.tags.split(",") : this.props.sermon.tags;
        const pdfURI = (data.pdfURL) ? data.pdfURL : this.props.sermon.pdfURI;
        

        let sermonToUpdate = {
            id: this.props.sermon.id,
            slug: this.props.sermon.slug,
            series: data.series,
            mp3URI: data.audioURL,
            imageURI: data.imageURL,
            pdfURI: pdfURI,
            title: data.title,
            tags: tags
        }

        this.props.updateSermon(this.props.sermon.id, sermonToUpdate);

    }

    render() {

        const series = (this.props.sermon) ? this.props.sermon.series : null;
        const speaker = (this.props.sermon) ? this.props.sermon.speaker : null;
        let pdfURL = (this.props.sermon) ? this.props.sermon.pdfURI : '';
        let audioURL = (this.props.sermon) ? this.props.sermon.mp3URI : '';
        let title = (this.props.sermon) ? this.props.sermon.title : 'title';
        let imageURL = (this.props.sermon) ? this.props.sermon.imageURI : null;


        const myInitialValues = {
            initialValues: {
                pdfURL: pdfURL,
                audioURL: audioURL,
                title: title,
                series: series,
                speaker: speaker,
                imageURL: imageURL

            }
        }

        return (
            <AddEditSermon
                speakers={this.props.speakers}
                series={this.props.allSeries}
                sermon={this.props.sermon}
                onSubmit={this.handleSubmit.bind(this)} />
        )
    }


};

const sermonService = new SermonService();

function mapStateToProps(state) {
    
    return {}
} 

function mapDispatchToProps(dispatch) {

    return {
        updateSermon: (sermonId, data) => {
            dispatch(sermonService.updateSermon(sermonId, data));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SermonEditor);
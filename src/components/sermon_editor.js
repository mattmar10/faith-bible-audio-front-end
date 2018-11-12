import React from 'react';
import {withRouter, Link} from "react-router-dom";
import AddEditSermon from "../components/add_edit_sermon";
import SermonService from "../services/sermon-service";


class SermonEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };

    }



    handleSubmit(data) {
        console.log(JSON.stringify(data, null, 2) );

    }

    render() {

        const series = (this.props.sermon) ? this.props.sermon.series : null;
        const speaker = (this.props.sermon) ? this.props.sermon.speaker : null;
        let pdfURL = (this.props.sermon) ? this.props.sermon.pdfURI : '';
        let audioURL = (this.props.sermon) ? this.props.sermon.mp3URI : '';
        let title =  (this.props.sermon) ? this.props.sermon.title : 'title';
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

        return(
            <AddEditSermon
                           speakers={this.props.speakers}
                           series={this.props.allSeries}
                           sermon={this.props.sermon}
                           onSubmit={this.handleSubmit.bind(this)}/>
        )
    }


};

const sermonService = new SermonService();

export default withRouter(SermonEditor);
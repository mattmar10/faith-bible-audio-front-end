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
        const tags = (data.tags) ? data.tags.split(",") : this.props.sermon.tags;
        const pdfURI = (data.pdfURL) ? data.pdfURL : this.props.sermon.pdfURI;
        const series = this.props.allSeries.find(s => s.title == data.series);
        

        let sermonToUpdate = {
            id: this.props.sermon.id,
            slug: this.props.sermon.slug,
            series: series.title,
            seriesSlug: series.slug,
            mp3URI: data.audioURL,
            imageURI: data.imageURL,
            pdfURI: pdfURI,
            title: data.title,
            tags: tags,
            stats: this.props.sermon.stats
        }

        this.props.updateSermon(this.props.sermon.id, sermonToUpdate);
    }

    handleNewSeriesSubmit(data){
        const tags = (data.seriesTags) ? data.seriesTags.split(",") : [];
        const slug = data.seriesTitle.replace(/\s/g, "+").toLowerCase();

        const series = {
            title: data.seriesTitle,
            imageURL: data.seriesImage,
            tags: data.seriesTags
        }

        console.log(series);

    }

    render() {

        return (
            <AddEditSermon
                speakers={this.props.speakers}
                series={this.props.allSeries}
                sermon={this.props.sermon}
                onSubmit={this.handleSubmit.bind(this)}
                onNewSeriesSubmit={this.handleNewSeriesSubmit.bind(this)} />
        )
    }


};

const sermonService = new SermonService();

function mapStateToProps(state) {
    
    return {

    };
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
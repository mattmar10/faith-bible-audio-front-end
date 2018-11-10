import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddEditSermon from "../components/add_edit_sermon";
import SermonService from "../services/sermon-service";


class AddEditSermonContainer extends Component {

    constructor(props){
        super(props);
    }


    render(){

        const series = (this.props.sermon) ? this.props.sermon.series : null;
        const speaker = (this.props.sermon) ? this.props.sermon.speaker : null;
        let pdfURL = (this.props.sermon) ? this.props.sermon.pdfURI : '';
        let audioURL = (this.props.sermon) ? this.props.sermon.mp3URI : '';
        let title =  (this.props.sermon) ? this.props.sermon.title : 'title';

        console.log(this.props.sermon);

        return(
          <AddEditSermon speakers={this.props.speakers}
                         series={this.props.series}
                         sermon={this.props.sermon}
                         speaker={speaker}
                         series={series}
                         pdfURL={pdfURL}
                         title={title}
          />
        );
    }
}

const sermonService = new SermonService();

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {

    return {

    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddEditSermonContainer);
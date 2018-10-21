import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddEditSermon from "../components/add_edit_sermon";
import SermonService from "../services/sermon-service";


class AddEditSermonContainer extends Component {

    constructor(props){
        super(props);
    }


    render(){


        return(
          <AddEditSermon speakers={this.props.speakers}
                         series={this.props.series}
                         sermon={this.props.sermon}/>
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
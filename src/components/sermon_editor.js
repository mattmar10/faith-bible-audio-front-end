import React from 'react';
import {withRouter, Link} from "react-router-dom";
import AddEditSermon from "../components/add_edit_sermon";


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

        const myInitialValues = {
            initialValues: {
              pdfURL: this.props.sermon.pdfURI,
              audioURL: this.props.sermon.mp3URI
            }
          }

        return(
            <AddEditSermon {...myInitialValues} 
                         speakers={this.props.speakers}
                         series={this.props.allSeries}
                         sermon={this.props.sermon}
                         onSubmit={this.handleSubmit.bind(this)}/>
        )
    }


};

export default withRouter(SermonEditor);
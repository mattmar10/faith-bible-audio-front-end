import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";

const addEditStyles = {
    addEditForm:{
        textAlign: 'left',
        fontFamily: 'Roboto',
        fontSize: '14px',
        paddingLeft: '5%',
        paddingRight: '7%',
        paddingBottom: '7%',
        paddingTop: '3%'
    },
    fieldWrapper: {
    },
    label: {
        paddingRight: '10px',
        fontWeight: 'bold',
        marginTop: '30px'
    },
    sublabel: {
        paddingRight: '10px',
        fontWeight: 'bold',
    },
    inputFullWidth: {
        width: '98%',
        border: 'none',
        padding: '10px',
        backgroundColor: '#f2f2f2',
    },
    inputRight: {
        width: '90%',
        border: 'none',
        padding: '10px',
        backgroundColor: '#f2f2f2',
    },
    selectBox: {
        padding: '15px',
        border: 'none',
        width: '50%',
    }

};

class AddEditSermon extends Component{

    constructor(props){
        super(props);
    }

    render() {

        const speakerOptions = this.props.speakers.map((speaker) => {
            return (

                <option key={speaker}
                        value={speaker}
                        >
                    {speaker}
                </option>
            )
        });

        const seriesOptions = this.props.series.map((series) => {

            const title = series.title;
            return (
                <option value={title} key={title}>
                    {title}
                </option>
            )
        });

        return(
            <div style={addEditStyles.addEditForm}>
                <h3>Sermon Editor</h3>
                <form onSubmit={this.props.handleSubmit}>


                    <div style={addEditStyles.fieldWrapper}>
                        <label style={addEditStyles.label} htmlFor="title">Title</label>
                        <Field name="title"
                               type="text"
                               component="input"
                               style={addEditStyles.inputFullWidth}
                        />

                    </div>

                    <div>
                        <label style={addEditStyles.label} htmlFor="series">Series</label>
                        <Field name="series"
                               style={addEditStyles.selectBox}
                               component="select">
                            {seriesOptions}
                        </Field>
                    </div>

                    <div>
                        <p style={{paddingTop:'10px'}}>or</p>

                        <div style={{paddingLeft:'5%'}}>
                            <label style={addEditStyles.sublabel}  htmlFor="newSeries">Add a New Series</label>
                            <Field name="newSeries"
                                   type="text"
                                   component="input"
                                   style={addEditStyles.inputFullWidth}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={addEditStyles.label} htmlFor="speaker">Speaker</label>
                        <Field name="speaker"
                               style={addEditStyles.selectBox}
                               component="select">
                            {speakerOptions}
                        </Field>
                    </div>

                    <div>
                        <p style={{paddingTop:'10px'}}>or</p>

                        <div style={{paddingLeft:'5%'}}>
                            <label style={addEditStyles.sublabel}  htmlFor="newSpeaker">Add a New Speaker</label>
                            <Field name="newSpeaker"
                                   type="text"
                                   component="input"
                                   style={addEditStyles.inputFullWidth}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={addEditStyles.label} htmlFor="audioURL">Audio URL</label>
                        <Field name="audioURL"
                            type="text"
                            component="input"
                            style={addEditStyles.inputFullWidth}
                        />
                    </div>

                    <div>
                        <label style={addEditStyles.label} htmlFor="imageURL">Image URL</label>
                        <Field name="imageURL"
                               type="text"
                               component="input"
                               style={addEditStyles.inputFullWidth}
                        />
                    </div>

                    <div>
                        <label style={addEditStyles.label} htmlFor="videoURL">Video URL</label>
                        <Field name="videoURL"
                            type="text"
                            component="input"
                            style={addEditStyles.inputFullWidth}
                        />
                    </div>
                   
                    <div>
                        <label style={addEditStyles.label} htmlFor="pdfURL">Sermon Notes URL</label>
                        <Field name="pdfURL"
                            type="text"
                            component="input"
                            style={addEditStyles.inputFullWidth}
                        />
                    </div>

                    <div>
                        <label style={addEditStyles.label} htmlFor="tags">Tags (separate with ',')</label>

                        <Field name="tags"
                            type="text"
                            component="input"
                            style={addEditStyles.inputFullWidth}
                        />
                       
                    </div>

                    <div>
                        <label style={addEditStyles.label} htmlFor="Mapped">Mark as Sanitized</label>

                        <Field
                            name="sanitized"
                            type="checkbox"
                            component="input"
                        />                    
                    </div>

                    <div>
                        <button type="submit">
                         Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }

}

function mapStateToProps(state) {


    const series = (state.sermonDetails.sermon) ? state.sermonDetails.sermon.series : null;
    const speaker = (state.sermonDetails.sermon) ? state.sermonDetails.sermon.speaker : null;
    let pdfURL = (state.sermonDetails.sermon) ? state.sermonDetails.pdfURI : '';
    let audioURL = (state.sermonDetails.sermon) ? state.sermonDetails.sermon.mp3URI : '';
    let title =  (state.sermonDetails.sermon) ? state.sermonDetails.sermon.title : 'title';
    let imageURL = (state.sermonDetails.sermon) ? state.sermonDetails.sermon.imageURI : null;

    return {
        initialValues: {
            pdfURL: pdfURL,
            audioURL: audioURL,
            title: title,
            series: series,
            speaker: speaker,
            imageURL: imageURL

        }
    };

}

AddEditSermon = reduxForm({
    form: 'AddEditSermonForm',
    enableReinitialize : true // this is needed!!

})(AddEditSermon)

export default connect(
    mapStateToProps
)(AddEditSermon);
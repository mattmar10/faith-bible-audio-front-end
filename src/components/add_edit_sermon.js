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


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <label style={addEditStyles.label}>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className="form-control" style={addEditStyles.inputFullWidth}/>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

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
                <option value={series.slug} key={title}>
                    {title}
                </option>
            )
        });

        return(
            <div style={addEditStyles.addEditForm}>
                <h3>Sermon Editor</h3>
                <form onSubmit={this.props.handleSubmit}>


                    <div style={addEditStyles.fieldWrapper}>                        
                       <Field name="title" type="text" component={renderField} label="Title"/>
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
                        <Field name="audioURL" type="text" component={renderField} label="Audio URL"/>
                    </div>

                    <div>
                        <Field name="imageURL" type="text" component={renderField} label="Image URL"/>
                    </div>

                    <div>
                        <Field name="videoURL" type="text" component={renderField} label="Video URL"/>
                    </div>
                   
                    <div>
                        <Field name="pdfURL" type="text" component={renderField} label="Sermon Notes URL"/>
                    </div>

                    <div>
                        <Field name="tags" type="text" component={renderField} label="Tags"/>
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
                {
                    this.props.updatedSermon && this.props.updatedSermon.id == this.props.sermon.id &&
                    <div style={{paddingTop: '15px', fontWeight: 'bold'}}>
                        <p>{this.props.sermon.title}  has been updated successfully.</p>
                    </div>
                }
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
    let tags = (state.sermonDetails.sermon) ? state.sermonDetails.sermon.tags.join(', '): null;

    return {
        initialValues: {
            pdfURL: pdfURL,
            audioURL: audioURL,
            title: title,
            series: series,
            speaker: speaker,
            imageURL: imageURL,
            tags: tags
        },
        updatedSermon: state.sermonUpdated.sermon
    };

}

const validate = values => {
    const errors = {};

    if (!values.title) {
        console.log('title is required');
        errors.title = 'Required';
    }

    if (!values.speaker && !values.newSpeaker) {
        console.log('a speaker is required');
        errors.speaker = 'Required';
    }

    if (!values.series && !values.newSeries) {
        console.log('series is required');
        errors.speaker = 'Required';
    }

    if (!values.audioURL) {
        console.log('audioURL is required');
        errors.audioURL = 'Required';
    }

    if (!values.imageURL) {
        console.log('imageURL is required');
        errors.imageURL = 'Required';
    }

    return errors;
};

AddEditSermon = reduxForm({
    form: 'AddEditSermonForm',
    validate,
    enableReinitialize : true // this is needed!!

})(AddEditSermon)

export default connect(
    mapStateToProps
)(AddEditSermon);
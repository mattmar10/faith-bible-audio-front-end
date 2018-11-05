import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';

const addEditStyles = {
    addEditForm:{
        textAlign: 'left',
        fontFamily: 'Roboto',
        fontSize: '14px',
        padding: '7%'
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
        padding: '5px',
        border: 'none',
        width: '100%',
    }

};

class AddEditSermon extends Component{

    constructor(props){
        super(props);
        
        this.renderSpeakerField = this.renderSpeakerField.bind(this);
        this.renderSeriesField = this.renderSeriesField.bind(this);
        this.renderTitleField = this.renderTitleField.bind(this);
        this.renderAudioURLField = this.renderAudioURLField.bind(this);
        this.renderNewSpeakerField = this.renderNewSpeakerField.bind(this);
        this.renderNewSeriesField = this.renderNewSeriesField.bind(this);
        this.renderNotesURLField = this.renderNotesURLField.bind(this);

    }

    renderTitleField(field) {

        let title =  (this.props.sermon) ? this.props.sermon.title : 'title';

        return(
            <div style={addEditStyles.fieldWrapper}>
                <label style={addEditStyles.label} htmlFor="title">Title</label>
                <input type="text" 
                       style={addEditStyles.inputFullWidth}
                       value={title}
                />
                

            </div>
        )
    }

    renderAudioURLField(field) {

        let mp3URI = (this.props.sermon) ? this.props.sermon.mp3URI : '';

        return(
            <div>
                <label style={addEditStyles.label} htmlFor="audioURL">Audio URL</label>
                <input type="text" style={addEditStyles.inputFullWidth}
                       {...field.input}
                       value={mp3URI}
                />
            </div>
        )
    }

    renderVideoURLField(field) {

        return(
            <div>
                <label style={addEditStyles.label} htmlFor="videoURL">Video URL</label>
                <input type="text" style={addEditStyles.inputFullWidth}
                       {...field.input}
                />
            </div>
        )
    }

    renderNotesURLField(field) {

        let pdfURL = (this.props.sermon) ? this.props.sermon.pdfURI : '';

        return(
            <div>
                <label style={addEditStyles.label} htmlFor="notesPDFURL">Sermon Notes URL</label>
                <input type="text" style={addEditStyles.inputFullWidth}
                       {...field.input}
                       value={pdfURL}
                />
            </div>
        )
    }

    renderTagsField(field) {
        return(
            <div>
                <label style={addEditStyles.label} htmlFor="Tags">Tags (separate with ',')</label>
                <input type="textarea" style={addEditStyles.inputFullWidth}
                       {...field.input}
                />
            </div>
        )
    }

    renderSpeakerField(field) {

        const options = this.props.speakers.map((speaker) => {
            return (
                <option key={speaker}
                        value={speaker}
                        style={addEditStyles.selectBox}>
                    {speaker}
                </option>
            )
        });

        const value = (this.props.sermon) ? this.props.sermon.speaker : null;

        return(
            <div>
                <label style={addEditStyles.label} htmlFor="speaker">Speaker</label>
                <select {...field.input} value={value} style={addEditStyles.selectBox}>
                    {options}
                </select>
            </div>
        )
    }

    renderNewSpeakerField(field) {

        return(
            <div>
                <p style={{paddingTop:'10px'}}>or</p>
                
                <div style={{paddingLeft:'5%'}}>
                    <label style={addEditStyles.sublabel}  htmlFor="newSpeaker">Add a New Speaker</label>
                    <input type="textarea"
                        {...field.input}
                        style={addEditStyles.inputFullWidth}
                    />
                </div>
            </div>
        )
    }

    renderSeriesField(field) {

        const options = this.props.series.map((series) => {
            return (
                <option key={series.seriesSlug}
                        value={series.seriesTitle}
                        style={addEditStyles.selectBox}>
                    {series.seriesTitle}
                </option>
            )
        }); 
        
        const value = (this.props.sermon) ? this.props.sermon.series : null;

        return(
            <div>
                <label style={addEditStyles.label} htmlFor="series">Series</label>
                <select {...field.input} 
                        style={addEditStyles.selectBox}
                        value={value}>
                    {options}
                </select>
            </div>
        )
    }

    renderNewSeriesField(field) {

        return(
            <div>
                <p style={{paddingTop:'10px'}}>or</p>
                
                <div style={{paddingLeft:'5%'}}>
                    <label style={addEditStyles.sublabel}  htmlFor="newSeries">Add a New Series</label>
                    <input type="textarea"
                        {...field.input}
                        style={addEditStyles.inputFullWidth}
                    />
                </div>
            </div>
        )
    }

    renderMarkAsSanitized(field){
        return(
            <div>
                <label style={addEditStyles.label} htmlFor="Mapped">Mark as Sanitized</label>
                <input type="checkbox" name="sanitized" checked={true}/>
                
            </div>
        )
    }

    render() {
        return (
            <div style={addEditStyles.addEditForm}>
                <form onSubmit={this.props.handleSubmit}>
                    <Field name="title" component={this.renderTitleField}
                    />
                    <Field name="series" component={this.renderSeriesField}
                    />
                    <Field name="newSeries" component={this.renderNewSeriesField}
                    />
                    <Field name="speaker" component={this.renderSpeakerField}
                    />
                    <Field name="newSpeaker" component={this.renderNewSpeakerField}
                    />
                    <Field name="audioURL" component={this.renderAudioURLField}
                    />
                    <Field name="videoURL" component={this.renderVideoURLField}
                    />
                    <Field name="notesPDFURL" component={this.renderNotesURLField}
                    />
                    <Field name="tags" component={this.renderTagsField}
                    />
                    <Field name="sanitized" component={this.renderMarkAsSanitized} />
                    <label style={addEditStyles.label} htmlFor="Mapped">Mark as Sanitized</label>

                    <div>
                        <Field
                            name="sanitized"
                            type="checkbox"
                            component="input"
                        />                    
                    </div>

                    <label>Last Name</label>
                    <div>
                    <Field
                        name="lastName"
                        component="input"
                        type="text"
                        placeholder="Last Name"
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

export default reduxForm({
    form: 'AddEditSermonForm'
})(AddEditSermon);
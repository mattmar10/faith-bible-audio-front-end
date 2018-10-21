import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';


class AddEditSermon extends Component{

    constructor(props){
        super(props);

        this.renderSpeakerField = this.renderSpeakerField.bind(this);
        this.renderSeriesField = this.renderSeriesField.bind(this);
    }

    renderTitleField(field) {
        return(
            <div>
                <label htmlFor="title">Title</label>
                <input type="text"
                       {...field.input}
                />
            </div>
        )
    }

    renderAudioURLField(field) {
        return(
            <div>
                <label htmlFor="audioURL">Audio URL</label>
                <input type="text"
                       {...field.input}
                />
            </div>
        )
    }

    renderVideoURLField(field) {
        return(
            <div>
                <label htmlFor="videoURL">Video URL</label>
                <input type="text"
                       {...field.input}
                />
            </div>
        )
    }

    renderNotesURLField(field) {
        return(
            <div>
                <label htmlFor="notesPDFURL">Sermon Notes URL</label>
                <input type="text"
                       {...field.input}
                />
            </div>
        )
    }

    renderTagsField(field) {
        return(
            <div>
                <label htmlFor="Tags">Tags (separate with ',')</label>
                <input type="textarea"
                       {...field.input}
                />
            </div>
        )
    }

    renderSpeakerField(field) {

        const options = this.props.speakers.map((speaker) => {
            return (
                <option key={speaker.seriesSlug}
                        value={speaker.seriesTitle}>
                    {speaker}
                </option>
            )
        });

        return(
            <div>
                <label htmlFor="speaker">Speaker</label>
                <select {...field.input}>
                    {options}
                </select>
            </div>
        )
    }

    renderNewSpeakerField(field) {
        return(
            <div>
                <label htmlFor="newSpeaker">or Add a New Speaker</label>
                <input type="textarea"
                       {...field.input}
                />
            </div>
        )
    }

    renderSeriesField(field) {

        const options = this.props.series.map((series) => {
            return (
                <option key={series.seriesSlug}
                        value={series.seriesTitle}>
                    {series.seriesTitle}
                </option>
            )
        });

        return(
            <div>
                <label htmlFor="series">Series</label>
                <select {...field.input}>
                    {options}
                </select>
            </div>
        )
    }

    render() {
        return (
            <div>
                <form>
                    <Field name="title" component={this.renderTitleField}
                    />
                    <Field name="date" component="input" type="text"
                    />
                    <Field name="series" component={this.renderSeriesField}
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
                </form>
            </div>
        );
    }

}

export default reduxForm({
    form: 'AddEditSermonForm'
})(AddEditSermon);
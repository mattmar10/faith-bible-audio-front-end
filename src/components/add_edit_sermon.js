import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import NewSeriesForm from './add_series_form';


const addEditStyles = {
    addEditForm: {
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
            <input {...input} placeholder={label} type={type} className="form-control" style={addEditStyles.inputFullWidth} />
            {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)

class AddEditSermon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openDialog: false
        };

        this.handleNewSeriesClick = this.handleNewSeriesClick.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);

    }

    handleNewSeriesClick() {
        console.log('new series');
        this.setState({openDialog: true});
    }

    handleClose = () => {
        this.setState({ openDialog: false });
    };

    toggleDialog() {
        this.setState(state => ({
            openDialog: !state.openDialog,
            anchor: state.anchor
        }));
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

        return (
            <div style={addEditStyles.addEditForm}>
                <h3>Sermon Editor</h3>
                <form onSubmit={this.props.handleSubmit}>


                    <div style={addEditStyles.fieldWrapper}>
                        <Field name="title" type="text" component={renderField} label="Title" />
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
                        <p style={{ paddingTop: '15px' }}>or
                        <span
                                style={{ fontWeight: 'bold', cursor: 'pointer', paddingLeft: '10px' }}
                                onClick={this.handleNewSeriesClick}>Add a New Series</span></p>
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
                        <p style={{ paddingTop: '10px' }}>or</p>

                        <div style={{ paddingLeft: '5%' }}>
                            <label style={addEditStyles.sublabel} htmlFor="newSpeaker">Add a New Speaker</label>
                            <Field name="newSpeaker"
                                type="text"
                                component="input"
                                style={addEditStyles.inputFullWidth}
                            />
                        </div>
                    </div>

                    <div>
                        <Field name="audioURL" type="text" component={renderField} label="Audio URL" />
                    </div>

                    <div>
                        <Field name="imageURL" type="text" component={renderField} label="Image URL" />
                    </div>

                    <div>
                        <Field name="videoURL" type="text" component={renderField} label="Video URL" />
                    </div>

                    <div>
                        <Field name="pdfURL" type="text" component={renderField} label="Sermon Notes URL" />
                    </div>

                    <div>
                        <Field name="tags" type="text" component={renderField} label="Tags" />
                    </div>

                    <div>
                        <label style={addEditStyles.label} htmlFor="sanitized">Mark as Sanitized</label>

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
                    <div style={{ paddingTop: '15px', fontWeight: 'bold' }}>
                        <p>{this.props.sermon.title}  has been updated successfully.</p>
                    </div>
                }
                <Dialog
                    fullWidth={true}
                    open={this.state.openDialog}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Series</DialogTitle>
                    <DialogContent>
                        <NewSeriesForm onSubmit={(e) => {
                            this.props.onNewSeriesSubmit(e);
                            this.handleClose();}}/>
          
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const series = (state.sermonDetails.sermon) ? state.sermonDetails.sermon.series : null;
    const speaker = (state.sermonDetails.sermon) ? state.sermonDetails.sermon.speaker : null;
    let pdfURL = (state.sermonDetails.sermon) ? state.sermonDetails.pdfURI : '';
    let audioURL = (state.sermonDetails.sermon) ? state.sermonDetails.sermon.mp3URI : '';
    let title = (state.sermonDetails.sermon) ? state.sermonDetails.sermon.title : 'title';
    let imageURL = (state.sermonDetails.sermon) ? state.sermonDetails.sermon.imageURI : null;
    let tags = (state.sermonDetails.sermon) && (state.sermonDetails.sermon.tags) ? state.sermonDetails.sermon.tags.join(', ') : null;
    let sanitized = (state.sermonDetails.sermon) && (state.sermonDetails.sermon.sanitized) ? state.sermonDetails.sermon.sanitized : null;

    return {
        initialValues: {
            pdfURL: pdfURL,
            audioURL: audioURL,
            title: title,
            series: series,
            speaker: speaker,
            imageURL: imageURL,
            tags: tags,
            sanitized: sanitized
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
    enableReinitialize: true // this is needed!!

})(AddEditSermon)

export default connect(
    mapStateToProps
)(AddEditSermon);
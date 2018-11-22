import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.seriesTitle) {
    errors.seriesTitle = 'Title is Required'
  } 
  if (!values.seriesImage) {
    errors.seriesImage = 'Series Image URL is Required'
  } 
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const NewSeriesForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="seriesTitle" type="text" component={renderField} label="Title"/>
      <Field name="seriesImage" type="url" component={renderField} label="URL"/>
      <Field name="seriesTags" type="text" component={renderField} label="Tags (Separate with ,)"/>
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'newSeries',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(NewSeriesForm)
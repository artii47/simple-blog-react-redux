import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component{

    renderField(field){
        console.log('field is ', field)
        const { meta: {touched, error} } = field;

        const className = `form-control ${touched && error ? 'is-invalid' : ''}`;

        return (
            <div>
            <label>{field.label}</label>
                <input
                    className={className}
                    type={field.type}
                    {...field.input}
                />
                <div className='text-help'>
                {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit = (values) => {
        //values contains title, categories and content
        console.log('values',values);
        this.props.createPost(values, () =>{
            this.props.history.push('/');
        });
    }

    render(){
        const { handleSubmit } = this.props;
       

       return(

        // handleSumbnit is some redux stuff, it checks if everything with our 
        // form is ok then it calls onSubmit
        <form  onSubmit={handleSubmit(this.onSubmit)}>
                <Field 
                    label='Title'
                    name='title'
                    type='text'
                    component={this.renderField}
                />
                <Field 
                    label='Categories'
                    name='categories'
                    type='text'
                    component={this.renderField}
                />
                <Field 
                    label='Post Content'
                    name='content'
                    type='text'
                    component={this.renderField}
                />

                <button type='submit' className ='btn btn-primary'>
                    Submit
                </button>

                <Link className='btn btn-danger' to='/'>
                    Cancel
                </Link>
        </form>
        )
    }
}

function validate(values){
    const errors = {};

    //validate the inputs from 'values'
    if(!values.title) {
        errors.title = 'Enter a title!';
    }
    if(!values.categories) {
        errors.categories = 'Enter a categories!';
    }
    if(!values.content) {
        errors.content = 'Enter a content!';
    }
    
    //if errors is empty, the form is fine to submit
    //if errors has any proporities, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'PostsNewForm'
})(
    connect(null, {createPost})(PostsNew)
);


import React, {Component} from 'react';
import {connect} from 'react-redux';

import {checkValidity} from '../../helpers/helpers';
import * as actions from '../../store/actions/index';
import classes from './AddTask.sass';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class AddTask extends Component {
  state = {
    form: {
      title: {
        elemType: 'input',
        elemConfig: {
          type: 'text',
          placeholder: 'Title'
        },
        value: '',
        validation: {
          rules: {
            required: true,
            minLength: 6
          },
          messages: {
            required: 'You should fill this field',
            minLength: 'Your title should have at least 6 characters'
          }
        },
        errorMessage: '',
        valid: false,
        touched: false
      },
      description: {
        elemType: 'textarea',
        elemConfig: {
          placeholder: 'Description'
        },
        value: '',
        valid: true,
        touched: false
      }
    },
    formIsValid: false
  };
  inputChangeHandler = (event,itemId) => {
    const value = event.target.value;
    const updatedItems  = {...this.state.form};
    const updatedItem = {...updatedItems[itemId]};
    updatedItem.touched = true;
    updatedItem.value = value;
    const validResult = checkValidity(value,updatedItem.validation);
    updatedItem.valid = validResult.valid;
    updatedItem.errorMessage = validResult.message;
    updatedItems[itemId] = updatedItem;
    let formIsValid = true;
    for(let key in updatedItems) {
      formIsValid = updatedItems[key].valid && formIsValid;
    }
    this.setState({
      form: updatedItems,
      formIsValid
    });
  };
  submitTaskHandler = (event) => {
    event.preventDefault();
    const task = {};
    for(let key in this.state.form) {
      task[key] = this.state.form[key].value;
    }
    task.date = new Date().toLocaleDateString();
    task.completed = false;
    task.editing = false;
    task.userId = this.props.userId;
    this.props.onAddTask(task,this.props.token);
    this.props.closed();
  };
  render() {
    const formElements = [];
    for(let key in this.state.form) {
      formElements.push({
        id: key,
        ...this.state.form[key]
      });
    }
    return (
      <form onSubmit={this.submitTaskHandler} className={classes.AddTask}>
        <h2 className={classes.AddTask__title}>New task</h2>
        {formElements.map(formElem => (
          <Input key={formElem.id}
            touched={formElem.touched}
            valid={formElem.valid}
            elemType={formElem.elemType}
            config={formElem.elemConfig}
            errorMessage={formElem.errorMessage}
            changed={(event) => this.inputChangeHandler(event,formElem.id)}/>
          ))
        }
        <Button disabled={!this.state.formIsValid}>Create task</Button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddTask: (task,token) => dispatch(actions.addTask(task,token))
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(AddTask);
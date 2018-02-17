import React, {Component} from 'react';
import {connect} from 'react-redux';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import * as actions from '../../store/actions/index';

import classes from './TasksList.sass';
import TaskControls from '../../components/Tasks/TasksControls/TasksControls';
import Task from '../../components/Tasks/Task/Task';
import Modal from '../../components/UI/Modal/Modal';
import AddTask from '../AddTask/AddTask';
import Spinner from '../../components/UI/Spinner/Spinner';

class TasksList extends Component {
  state = {
    creatingTask: false,
    editingTasks: {}
  };
  componentDidMount() {
    this.props.onFetchTasks(this.props.token,this.props.userId);
  }
  showModalHandler = () => {
    this.setState({creatingTask: true});
  };
  hideModalHandler = () => {
    this.setState({creatingTask: false});
  };
  render() {
    const tasksArray = [];
    for(let key in this.props.tasks) {
      tasksArray.push({
        id: key,
        ...this.props.tasks[key]
      })
    }
    let tasks = (
      <TransitionGroup component="ul">
        {tasksArray.map(task => (
          <CSSTransition
            key={task.id}
            timeout={500}
            classNames={{
              enter: classes.TasksList_enter,
              enterActive: classes.TasksList_enter_active,
              exit: classes.TasksList_exit,
              exitActive: classes.TasksList_exit_active
            }}
            mountOnEnter
            unmountOnExit
          >
            <Task
              title={task.title}
              description={task.description}
              date={task.date}
              completed={task.completed}
              editing={task.editing}
              onToggleEdit={() => this.props.onToggleEditTask(task.id)}
              offToggleEdit={() => this.props.offToggleEditTask(task.id,{title: task.title,description: task.description},this.props.token)}
              completedHandler={() => this.props.onCompleteTask(task.id,this.props.token)}
              editHandler={(event,field) => this.props.onInputEditTask(event.target.value,task.id,field)}
              removed={() => this.props.onRemoveTask(task.id,this.props.token)}/>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
    if(this.props.loading) {
      tasks = <Spinner/>
    }
    if(this.props.error) {
      tasks = (
        <h1 className={classes.TasksList__error}>Server error in {this.props.error.type},<br/> Please try later</h1>
      )
    }
    const completedLength = tasksArray.reduce((size,item) => {
      if(item.completed)
        return size + 1;
      else
        return size;
    },0);
    return (
      <div className={classes.TasksList}>
        <TaskControls completedLength={completedLength} tasksLength={tasksArray.length} clicked={this.showModalHandler}/>
        {tasks}
        <Modal shown={this.state.creatingTask} closed={this.hideModalHandler}>
          <AddTask closed={this.hideModalHandler}/>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks.tasks,
    loading: state.tasks.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.tasks.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onRemoveTask: (taskId,token) => dispatch(actions.removeTask(taskId,token)),
    onCompleteTask: (taskId,token) => dispatch(actions.completeTask(taskId,token)),
    onInputEditTask: (value,taskId,field,token) => dispatch(actions.inputEditTask(value,taskId,field,token)),
    onToggleEditTask: (taskId) => dispatch(actions.onEditTask(taskId)),
    offToggleEditTask: (taskId,taskContent,token) => dispatch(actions.offEditTask(taskId,taskContent,token)),
    onFetchTasks: (token,userId) => dispatch(actions.fetchTasks(token,userId))
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(TasksList);
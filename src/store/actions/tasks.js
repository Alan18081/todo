import * as actionTypes from './actionTypes';
import axios from '../../axios/axios.tasks';

export const addTask = (task,token) => {
  return dispatch => {
    axios.post('/tasks.json?auth=' + token,task)
      .then(response => {
        dispatch({
          type: actionTypes.ADD_TASK,
          task,
          taskId: response.data.name
        });
      })
      .catch(error => {
        dispatch(errorTasks({error,type: 'creating task'}));
      });
  };
};

export const removeTask = (taskId,token) => {
  return dispatch => {
    axios.delete(`/tasks/${taskId}.json?auth=${token}`)
      .then(response => {
        dispatch({
            type: actionTypes.REMOVE_TASK,
            taskId
        });
      })
      .catch(error => {
        dispatch(errorTasks({error,type: 'removing task'}));
      })
  };
};

export const completeTask = (taskId,token) => {
  return dispatch => {
    axios.get(`/tasks/${taskId}.json?auth=${token}`)
      .then(response => {
        const completedValue = response.data.completed;
        axios.patch(`/tasks/${taskId}.json?auth=${token}`,{
          completed: !completedValue
        })
          .then(response => {
            dispatch({
              type: actionTypes.COMPLETE_TASK,
              taskId
            })
          })
          .catch(error => {
            dispatch(errorTasks({error,type: 'modifying task'}));
          })
      })
      .catch(error => {
        dispatch(errorTasks({error,type: 'modifying task'}));
      })
  };
};

export const inputEditTask = (value,taskId,field) => {
  console.log(value,taskId,field);
  return {
    type: actionTypes.INPUT_EDIT_TASK,
    taskId,
    field,
    value
  }
};

export const onEditTask = (taskId) => {
  return {
    type: actionTypes.ON_EDIT_TASK,
    taskId
  }
};

export const offEditTask = (taskId,taskContent,token) => {
  return dispatch => {
    axios.patch(`/tasks/${taskId}.json?auth=${token}`,taskContent)
      .then(response => {
        dispatch({
          type: actionTypes.OFF_EDIT_TASK,
          taskId
        });
      })
      .catch(error => {
        dispatch(errorTasks(error));
      });
  };
};

const fetchTasksStart = () => {
  return {
    type: actionTypes.FETCH_TASKS_START
  }
};

const fetchTasksSuccess = (tasks) => {
  return {
    type: actionTypes.FETCH_TASKS_SUCCESS,
    tasks
  }
};

const errorTasks = (error) => {
  return {
    type: actionTypes.ERROR_TASKS,
    error
  }
};

export const fetchTasks = (token,userId) => {
  return dispatch => {
    dispatch(fetchTasksStart());
    axios.get(`/tasks.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then(response => {
        dispatch(fetchTasksSuccess(response.data));
      })
      .catch(error => {
        dispatch(errorTasks({error,type: 'loading tasks'}));
      });
  }
};
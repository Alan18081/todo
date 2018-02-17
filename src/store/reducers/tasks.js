import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tasks: {},
  loading: false
};

const addTask = (state,action) => {
  return {
    ...state,
    tasks: {
      ...state.tasks,
      [action.taskId]:action.task
    }
  }
};

const removeTask = (state,action) => {
  const tasks = {...state.tasks};
  delete tasks[action.taskId];
  return {
    ...state,
    tasks
  }
};

const completeTask = (state,action) => {
  const tasks = {...state.tasks};
  const taskElem = {...tasks[action.taskId]};
  taskElem.completed = !taskElem.completed;
  tasks[action.taskId] = taskElem;
  return {
    ...state,
    tasks
  }
};

const inputEditTask = (state,action) => {
  const tasks = {...state.tasks};
  const taskElem = {...tasks[action.taskId]};
  taskElem[action.field] = action.value;
  tasks[action.taskId] = taskElem;
  return {
    ...state,
    tasks
  }
};

const onEditTask = (state,action) => {
  const tasks = {...state.tasks};
  const taskElem = {...tasks[action.taskId]};
  taskElem.editing = true;
  tasks[action.taskId] = taskElem;
  return {
    ...state,
    tasks
  }
};

const offEditTask = (state,action) => {
  const tasks = {...state.tasks};
  const taskElem = {...tasks[action.taskId]};
  taskElem.editing = false;
  tasks[action.taskId] = taskElem;
  return {
    ...state,
    tasks
  }
};

const fetchTasksStart = (state) => {
  return {
    ...state,
    loading: true
  }
};

const fetchTasksSuccess = (state,action) => {
  return {
    ...state,
    tasks: action.tasks,
    loading: false
  }
};

const errorTasks = (state,action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }
};

const reducer = (state = initialState,action) => {
  switch(action.type) {
    case actionTypes.ADD_TASK:
      return addTask(state,action);
    case actionTypes.REMOVE_TASK:
      return removeTask(state,action);
    case actionTypes.COMPLETE_TASK:
      return completeTask(state,action);
    case actionTypes.INPUT_EDIT_TASK:
      return inputEditTask(state,action);
    case actionTypes.ON_EDIT_TASK:
      return onEditTask(state,action);
    case actionTypes.OFF_EDIT_TASK:
      return offEditTask(state,action);
    case actionTypes.FETCH_TASKS_START:
      return fetchTasksStart(state);
    case actionTypes.FETCH_TASKS_SUCCESS:
      return fetchTasksSuccess(state,action);
    case actionTypes.ERROR_TASKS:
      return errorTasks(state,action);
    default:
      return state;
  }
};

export default reducer;
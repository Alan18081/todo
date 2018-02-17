import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://todo-ea259.firebaseio.com/'
});

export default instance;
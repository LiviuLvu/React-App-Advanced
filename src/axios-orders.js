import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-complete-guide-84b96.firebaseio.com/'
});

export default instance;
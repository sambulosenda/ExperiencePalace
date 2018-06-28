
import axios from 'axios';
import { GET_ERRORS } from './types';
import setAuthToken from '../utils/setAuthToken';


//Register user
export const registerUser = (userData, history)=> dispatch => {
  axios
    .post('/api/user/register', userData)
    .then(res => history.push('/login'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login user Token 

export const loginUser = userData => dispatch => {
  axios.post('/api/user/register', userData)
  .then(res => {

    //Save to local storage
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    //Set Tocket to Auth header
    setAuthToken(token);



  })
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};
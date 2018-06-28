
import axios from 'axios';
import { GET_ERRORS , SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


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

    //Decode Token to get user data
    const decoded = jwt_decode(token);
    //set current user

    dispatch(setCurrentUser(decoded));



  })
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

//Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}
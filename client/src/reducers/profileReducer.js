import { GET_PROFILE, PROFILE_LOADING } from '../actions/types';

const initiaState = {
   profile: null, 
   profiles: null, 
   loading : false
}

export default function (state = initiaState, action) {

  switch (action.type) {
    case PROFILE_LOADING:
    return { 
      ...state, 
      loading: true
    };
    case GET_PROFILE:
    return {
      ...state, 
      profile: action.payload, 
      loading: false
    };
    default:
      return state;
  }
}
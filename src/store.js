import { createStore,combineReducers,applyMiddleware } from 'redux';
const LOAD = 'LOAD'
const UPDATE = 'UPDATE'
const CREATE = 'CREATE'
const SET_VIEW = 'SET_VIEW'
import thunk from 'redux-thunk'
import axios from 'axios'
import logger from 'redux-logger'

const initialState = {
  groceries: [],
  view: ''
};

const groceriesReducer = (state=[],action) => {
  if(action.type === LOAD){
    state = action.groceries
  }
  if(action.type === UPDATE){
    state = state.map(grocery => grocery.id === action.grocery.id ? action.grocery : grocery );
  }
  if(action.type === CREATE){
    state = [...state,action.grocery]
  }
  return state;
}

const viewReducer = (state = '', action) => {
  if(action.type === SET_VIEW){
    state = action.view
  }
  return state;
}

const reducer = combineReducers({
  groceries : groceriesReducer,
  view : viewReducer
})

const store = createStore(reducer,applyMiddleware(thunk,logger));

const _loadGroceries = (groceries) => {
  return {
    type:LOAD,
    groceries
  }
}

const loadGroceries = () => {
  return async(dispatch) => {
    const groceries = (await axios.get('/api/groceries')).data;
    dispatch(_loadGroceries(groceries));
  }
}

const _setView = (view) => {
  return{
    type:SET_VIEW,
    view
  }
}

const setView = (view) => {
  return (dispatch) => {
    dispatch(_setView(view));
  }
}





export default store;
export {loadGroceries,setView}



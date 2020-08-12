import { createStore, combineReducers } from 'redux';
import { anecdoteReducer } from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificatonReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import filterReducer from './reducers/filterReducer';

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
})
const store = createStore(reducer, composeWithDevTools());
console.log(store.getState())
export default store;
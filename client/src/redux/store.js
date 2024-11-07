import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import incidentReducer from './reducers/incidentReducer';

// Combine all reducers (in case you add more in the future)
const rootReducer = combineReducers({
  incident: incidentReducer,
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;

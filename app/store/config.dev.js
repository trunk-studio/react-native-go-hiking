import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import * as reducers from '../reducers';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, promise, logger)(createStore);
const reducer = combineReducers(reducers);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}

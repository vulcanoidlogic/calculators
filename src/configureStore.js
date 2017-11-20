import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'reducers';
import { logger } from 'redux-logger';
import { saveState } from 'src/reducers/localStorage';

const __DEVCLIENT__ = process.env.NODE_ENV === 'development';

const middleware = [thunkMiddleware];
if (__DEVCLIENT__) {
  middleware.push(logger);
}
export const initStore = initialState => {
  const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
  store.subscribe(() => {
    saveState(store.getState());
  });
  return store;
};

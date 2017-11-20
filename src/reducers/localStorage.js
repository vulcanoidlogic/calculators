import { LOCAL_STORAGE_KEY } from 'common/constants';
import _isNil from 'lodash/isNil';

export const loadState = () => {
  try {
    if (process.browser) {
      const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (_isNil(serializedState)) {
        return undefined;
      } else {
        return JSON.parse(serializedState);
      }
    } else {
      return undefined;
    }
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    if (process.browser) {
      localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    }
  } catch (err) {
    console.warn('Unable to write to localStorage err=', err);
  }
};

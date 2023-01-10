import {createStore} from 'redux';

import bookReducer from './reducer';

// Passing burgerReducer to createStore
const store=createStore(bookReducer);

export default store;

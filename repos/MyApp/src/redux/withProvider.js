import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';

const { store } = configureStore();

const withProvider = (Component) => (props) => (
<Provider store={store}>
        <Component {...props} />
    </Provider>
);


export default withProvider

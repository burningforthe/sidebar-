import React from 'react';
import {Provider} from 'react-redux';

import store from './src/store';
import Screen from './src/screens/FirstScreen';



const App= () => {
return (
	<Provider store={store}>
	<Screen/>
	</Provider>
);
};
	

export default App;

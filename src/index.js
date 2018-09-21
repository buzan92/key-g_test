import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Root from 'containers/Root';
import { store } from './configureStore';

import 'assets/css/app.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<Root />
		</Provider>
	</Router>,
	document.getElementById('root')
);

registerServiceWorker();

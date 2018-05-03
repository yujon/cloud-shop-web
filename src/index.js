import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './static/vendor/font-awesome/css/font-awesome.min.css';
import './static/css/index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

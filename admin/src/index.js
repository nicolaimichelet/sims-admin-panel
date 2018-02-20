import React from 'react';
import ReactDOM from 'react-dom';
import './Components/Containers/index.css';
import App from './Components/Containers/App';
import registerServiceWorker from './Components/Containers/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

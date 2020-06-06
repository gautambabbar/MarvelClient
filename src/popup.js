import React from 'react';
import ReactDom from 'react-dom';
import './firebase-init';
import AppComponent from './components/app/app.js';

import './styles.scss';


function renderContent() {
  ReactDom.render(<AppComponent />, document.getElementById('root'));
}

document.addEventListener('DOMContentLoaded', () => {
  renderContent();
});



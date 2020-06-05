import React from 'react';
import ReactDom from 'react-dom';
import './firebase-init';
import AppComponent from './components/app.js';


function renderContent() {
  console.log(2);
  
  ReactDom.render(<AppComponent />, document.getElementById('root'));
}

document.addEventListener('DOMContentLoaded', () => {
  renderContent();
});



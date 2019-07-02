import React, { Component } from 'react';
import { render } from 'react-dom';
import Router from './router';
import App from "./components/App.js";

//render(<App/>, document.getElementById("root")
render(Router, document.getElementById('root'));
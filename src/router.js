import React from 'react';
//import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import {  Route, Link, NavLink, Switch,  HashRouter as Router} from "react-router-dom";


import { createBrowserHistory } from "history";

const history = createBrowserHistory()
// Layouts
import MainLayout from './components/main-layout';
import SearchLayout from './components/search-layout';

// Pages
import App from './components/app';
import UserList from './components/user-list';
import UserProfile from './components/user-profile';
import WineList from './components/wine-list';
import Register from './components/Register'

export default (
  <Router history={history}>
        <div>
        
       <App/>
    <Route component={MainLayout}>
      <Route exact path="/" component={WineList} />
      <Switch>
        <Route exact path="/users" component={SearchLayout}>
          {/* <Route component={UserList} /> */}
          <UserList/>
        </Route>
        <Route path="/users/:userId" component={UserProfile} />
        </Switch>
        <Route path="/register" component={Register} />
        <Switch>
    
       
        </Switch>
     

    </Route>
   
    </div>
  </Router>
);
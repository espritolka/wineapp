import React from 'react';
import { Link } from 'react-router-dom';
//var createReactClass = require('create-react-class');


class MainLayout extends React.Component {
  render() {
    return(
    <div className="app">
        <header className="primary-header"></header>
        <aside className="primary-aside">
          <ul>
            <li><Link color="inherit" to="/" activeClassName="active">Home</Link></li>
            <li><Link color="inherit" to="/users" activeClassName="active">Users</Link></li>
            {/* <li><Link to="/wines" activeClassName="active">Wines</Link></li> */}
          </ul>
        </aside>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}


export default MainLayout;
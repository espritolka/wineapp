import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
//import Link from '@material-ui/core'

class UserList extends React.Component {
state={
  users: []
}

componentDidMount() {
  this.getData();
}
  getData =()=>{
    axios.get('/api/users').then((res)=>{ 
      console.log(res.data)
      this.setState({'users': res.data })
    }
    )
  }
  render() {
    console.log(this.state)
    return (
      <ul className="user-list">
      {this.state.users.map((user, key)=>{
        return (<li key ={key}><Link to={'users/' + user._id}>{user.username}</Link></li>)
      })}

      </ul>
    );
  }
};

export default UserList;
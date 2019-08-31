import React from 'react';
import axios from 'axios'

class UserProfile extends React.Component {
state ={
  user:''
}

componentDidMount() {
  this.getData();
}
  getData =()=>{
    axios.get(`/api/users/${this.props.match.params.userId}`).then((res)=>{
      
      this.setState({'user': res.data })
    }
    )
  }
  getElement = () =>{
    return (<div>
 <p>Name: {this.state.user.name} </p>
 <p>Username: {this.state.user.username} </p>
 <p>Email: {this.state.user.email} </p>
 <p>Id: {this.state.user._id} </p>
 </div>
    )
  }
  render() {
    return (
 
    <div>
          {/* <h1>User Profile for userId: {this.props.match.params.userId}</h1> */}
      {this.state.user._id? this.getElement() : 'Загрузка данных'}
      </div>
    );
  }
};

export default UserProfile;
import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles, withTheme } from '@material-ui/core/styles';
import axios from 'axios'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import olga from '../avatar.jpg'
//import Link from '@material-ui/core'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 660,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});


class UserList extends React.Component {
state={
  users: []
}

componentDidMount() {
  this.getData();
}
  getData =()=>{
    axios.get('/api/users').then((res)=>{ 

      this.setState({'users': res.data })
    }
    )
  }
  render() {
    const { classes } = this.props;
  
    return (
      <List className={classes.root}>
      {this.state.users.map((user, key)=>{
        return (
          <Link to={'users/' + user._id} key={key}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={olga}  />
        </ListItemAvatar>
        <ListItemText
          primary={user.username}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </Link>)
    })}
    </List>
    );
  }
};

export default withStyles(styles)(UserList);
     // <ul className="user-list">
      // {this.state.users.map((user, key)=>{
      //   return (<li key ={key}><Link to={'users/' + user._id}>{user.username}</Link></li>)
      // })}

      // </ul>
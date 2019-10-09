import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import avatar from '../avatar.jpg'
import Avatar from '@material-ui/core/Avatar';
//import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { connect } from 'mongoose';
//import Link from '@material-ui/core/Link';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  button: {
    flexGrow: 0.5,
    // margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  link: {
    display: 'flex',
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});

class ButtonAppBar extends React.Component {

  constructor(props) {
    super(props);
  this.state = {
    open: false,
    openProfile: false,
    username: '',
    email: '',
    name: '',
    password: '',
    buttonName: 'Login',
    userId: '',
    userData: '',
  }
};  
  handleClose = (name) => {
    this.setState({
      [name]: false
    })
  }
  getUserById = (id) => {
  axios.get(`/api/users/${id}`).then((res)=>{
    this.setState({userData: res.data,
      email: res.data.email,
      name: res.data.name,})
  })
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  auth = () => {
    axios.post('/login', { username: this.state.username, password: this.state.password })
      .then((res) => {
        this.setState({
          open: false,
          userId: res.data.id,
          buttonName: this.state.username
        })
        this.getUserById(res.data.id)
      })
      .catch((error) => {
        console.log('auth error:', error)
      })
  }

  loginIn = (name) => {
    this.setState({
      [name]: true
    })
  }

  getElement = () => {
    const { classes } = this.props;
    if (this.state.buttonName == 'Login') {
      return (
        <Dialog open={this.state.open} onClose={() => this.handleClose('open')} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Sign in to Wine App
          </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              value={this.state.username}
              onChange={this.handleChange('username')}
              label="Username"
              type="login"
              fullWidth
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              onChange={this.handleChange('password')}
              value={this.state.password}
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose('open')} color="primary">
              Cancel
          </Button>
            <Button onClick={this.auth} color="primary">
              Sing in
          </Button>
          </DialogActions>
        </Dialog>
      )
    } else {
      return (
        <Dialog open={this.state.openProfile} onClose={() => this.handleClose('openProfile')} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Profile {this.state.username}
            </DialogContentText>
            <Avatar alt="Remy Sharp" src={avatar} className={classes.bigAvatar} />

            <TextField
              autoFocus
              margin="dense"
              id="username"
              value={this.state.username}
              onChange={this.handleChange('username')}
              label="Username"
              type="login"
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={this.state.name}
              onChange={this.handleChange('name')}
              label="Name"
              type="text"
              fullWidth
            />
            
            <TextField
              autoFocus
              margin="dense"
              id="email"
              value={this.state.email}
              onChange={this.handleChange('email')}
              label="Email"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose('openProfile')} color="primary">
              Cancel
          </Button>
            <Button color="primary">
              Change
          </Button>
          </DialogActions>
        </Dialog>
      )
    }

  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.getElement()}
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton> */}
            <Typography variant="title" color="inherit" className={classes.grow}>
              <Link to="/" className='active' >WineApp</Link>
            </Typography>
            <Button ><Link to="/users" className='active' >Users</Link></Button>
            <Button color="inherit"><Link to="/register" className='active'>Sign up</Link></Button>
            <Button color="inherit" onClick={() => this.loginIn(this.state.buttonName == 'Login' ? 'open' : 'openProfile')}>
              {this.state.buttonName}</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
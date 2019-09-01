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
//import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
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
  }
});

class ButtonAppBar extends React.Component {
  state = {
    open: false,
    openProfile: false,
    username: '',
    password: '',
    buttonName: 'Login',
    userId: ''
  }
  handleClose = (name) => {
    this.setState({
      [name]: false
    })
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  auth = () => {
    console.log('click')
    axios.post('/login', { username: this.state.username, password: this.state.password })
      .then((res) => {
        this.setState({
          open: false,
          userId: res.data.id,
          buttonName: this.state.username
        })
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
    console.log(document.cookie)
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
              <Link to="/" >WineApp</Link>
            </Typography>
            <Button ><Link to="/users" >Users</Link></Button>
            <Button color="inherit"><Link to="/register" >Sign up</Link></Button>
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
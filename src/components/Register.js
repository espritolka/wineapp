import React from 'react';
//import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

const style = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    menu: {
        width: 200,
    },
    textField: {
        marginLeft: 100,
        marginRight: 100,
        marginTop: 10
    },
    button: {
        margin: 50,
    }
};


class Register extends React.Component {

    state = {
        name: '',
        username: '',
        email: '',
        password: '',
        password2: ''
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };


    onConfirm = () => {

        let data = this.state
        axios.post('/register', data)
            .then((res) => {

            })
            .catch((error) => {

            })

    }

    render() {
        console.log(this.state)
        const { classes } = this.props;
        return (
            <Grid container justify="center">
                <h1>New User Registration</h1>
                <Grid container justify="center">
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="name"
                            label="Name"
                            className={classes.textField}
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            fullWidth
                            // style={{ margin: 25}}
                            variant="outlined"
                        />
                        <TextField
                            id="username"
                            label="Username"
                            className={classes.textField}
                            value={this.state.username}
                            onChange={this.handleChange('username')}
                            margin="normal"
                            // style={{ margin: 50}}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            id="email"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            //style={{ margin: 50}}
                            onChange={this.handleChange('email')}
                            margin="normal"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            id="password"
                            label="Password"
                            className={classes.textField}
                            value={this.state.password}
                            //style={{ margin: 50}}
                            onChange={this.handleChange('password')}
                            margin="normal"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            id="password2"
                            label="Confirm password"
                            className={classes.textField}
                            value={this.state.password2}
                            //style={{ margin: 50}}
                            onChange={this.handleChange('password2')}
                            margin="normal"
                            fullWidth
                            variant="outlined"
                        />

                    </form>
                    <Button color="primary" size="large" variant="contained" className={classes.button} onClick={() => this.onConfirm()}>
                        Сonfirm
      </Button>
                </Grid>
            </Grid>
        )
    }
};

export default withRouter(withStyles(style)(Register));
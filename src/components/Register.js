import React from 'react';
//import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Card from '@material-ui/core/Card';
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
    },
    card: {
        maxWidth: 645,
    },
    paper: {
        width: '70%', 
        marginTop: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
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
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonAdd />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                     </Typography>
                     <Grid container justify="center" xs={12} sm={10}>
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
                </div>
            </Grid>
        )
    }
};

export default withRouter(withStyles(style)(Register));
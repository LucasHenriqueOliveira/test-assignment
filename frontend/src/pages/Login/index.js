import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import api from '../../services/api';
import Logo from '../../assets/logo.jpg';
import Link from '@material-ui/core/Link';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    logo: {
        marginBottom: 20,
        width: 90
    },
    newUser: {
        cursor: 'pointer'
    }
}));

export default function Login() {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();
    
        // checks if fields are filled
        if(!email || !password) {
            enqueueSnackbar('Email and password fields are required.', { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
            return;
        }
        
        // send to api /login
        await api.post('login', { email, password })
            .then(response => {
                localStorage.setItem('authToken', response.data.authToken);
                history.push('/main');
            })
            .catch(function (err) {
                let message = '';
                if (err.response) {
                    // Request made and server responded
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                    message = err.response.data.hasOwnProperty("error");
                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request);
                    message = 'API request error!';
                }

                enqueueSnackbar(message, { 
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                });
            });
    }

    // redirect to User page
    function goUser(event) {
        event.preventDefault();
        history.push('/user');
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <img aria-hidden="true" alt="LinqPal" src={Logo} className={classes.logo}/>
                
                <Typography component="h1" variant="h5">
                    LinqPal
                </Typography>
                
                <form onSubmit={handleLogin} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Log In
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link onClick={goUser} variant="body2" className={classes.newUser}>
                                Add New User
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';

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
    },
    textField: {
        width: '100%',
    },
    margin: {
        marginTop: 10
    }
}));

export default function Login() {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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

                // success message 
                enqueueSnackbar(response.data.message, { 
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                });

                localStorage.setItem('token', response.data.data.authToken);
                localStorage.setItem('email', response.data.data.email);
                localStorage.setItem('_id', response.data.data._id);
                history.push('/users');
            })
            .catch(function (err) {
                if (err.response) {
                    // Request made and server responded
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);

                    // error message about api
                    enqueueSnackbar(err.response.data.message, { 
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                    });
                    
                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request);

                    // error message not connect api
                    enqueueSnackbar('API request error!', { 
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                    });
                }
            });
    }

    // redirect to User page
    function goUser(event) {
        event.preventDefault();
        history.push('/user');
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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

                    { /* 
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
                    */ }

                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="password">Password *</InputLabel>
                        <OutlinedInput
                            required
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            label="Password *"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                    </FormControl>

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

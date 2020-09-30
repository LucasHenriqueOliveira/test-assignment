import React from 'react';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Logo from '../../assets/logo.jpg';
import { useForm } from 'react-hook-form';
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    logo: {
        marginBottom: 20,
        width: 70
    },
    login: {
        cursor: 'pointer'
    }
}));

export default function User() {
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { register, handleSubmit } = useForm(); // initialize the hook

    async function onSubmit(data, event) {
        
        // checks if fields are filled
        if(!data.firstName || !data.lastName || !data.telephoneNumber || !data.ssn || !data.fullAddress) {
            enqueueSnackbar('Please fill in all fields.', { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
            return;
        }

        // send to api /user
        await api.post('user', data)
            .then(response => {

                // reset form values
                event.target.reset();

                // message success
                enqueueSnackbar(response.data.message, { 
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                });
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

                    // message error
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

    // redirect to Login page
    function goLogin(event) {
        event.preventDefault();
        history.push('/login');
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                
                <img aria-hidden="true" alt="LinqPal" src={Logo} className={classes.logo}/>
                
                <Typography component="h1" variant="h5">
                    Add Users
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                inputRef={register}
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                inputRef={register}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="telephoneNumber"
                                label="Telephone Number"
                                id="telephoneNumber"
                                inputRef={register}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="ssn"
                                label="SSN"
                                name="ssn"
                                inputRef={register}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="fullAddress"
                                label="Full Address"
                                name="fullAddress"
                                autoComplete="address"
                                inputRef={register}
                            />
                        </Grid>

                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Save
                    </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link onClick={goLogin} variant="body2" className={classes.login}>
                                Do you go to the admin page? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

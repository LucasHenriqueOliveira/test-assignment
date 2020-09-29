import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import Auth from '../../shared/auth';
import { useSnackbar } from 'notistack';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import api from '../../services/api';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      width: '100%'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function Users() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const token = Auth.getToken();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            name: "firstName",
            label: "First Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "lastName",
            label: "Last Name",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "telephoneNumber",
            label: "Telephone",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "fullAddress",
            label: "Address",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];

    const options = { 
        filterType : 'dropdown',
        selectableRows: false,
    }


    useEffect(() => {
        setLoading(true);

        // get to users in api /users
        api.get('users', { headers: {'Authorization' : "Bearer " + token } })
            .then(response => {
                setLoading(false);
                setUsers(response.data);
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

                setLoading(false);

                // message error
                enqueueSnackbar(message, { 
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                });
            });
	}, [setUsers]);

    return (
        <div className={classes.root}>
            <Grid item xs={12}>
                <MUIDataTable
                    title={"Users"}
                    data={users}
                    columns={columns}
                    options={options}
                />
            </Grid>
            
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

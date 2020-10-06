import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import Auth from '../../shared/auth';
import { useSnackbar } from 'notistack';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import api from '../../services/api';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 
import { connect } from 'react-redux';

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

const getMuiTheme = createMuiTheme({
    overrides: {
        MUIDataTableBodyRow: {
            root: {
                '&:nth-child(odd)': { 
                    backgroundColor: '#e2e2e2'
                }
            }
        },
        MUIDataTableHeadCell: {
            root: {
                fontWeight: '700'
            }
        }
    }
});

const Users = ({activeModule, activeLesson}) => {
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
        selectableRows: 'none',
    }


    useEffect(() => {
        setLoading(true);

        // get to users in api /users
        api.get('user', { headers: {'x-access-token' : token } })
            .then(response => {
                setLoading(false);
                setUsers(response.data.data);
            })
            .catch(function (err) {
                if (err.response) {
                    // Request made and server responded
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);

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

                setLoading(false);
            });
	}, [setUsers, token, enqueueSnackbar]);

    return (
        <div className={classes.root}>
            <Grid item xs={12}>
                <MuiThemeProvider theme={getMuiTheme}>
                    <MUIDataTable
                        title={"Users"}
                        data={users}
                        columns={columns}
                        options={options}
                    />
                </MuiThemeProvider>
            </Grid>
            
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default connect(state => ({
    activeModule: state.activeModule,
    activeLesson: state.activeLesson
}))(Users);
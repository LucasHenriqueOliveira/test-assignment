import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import MainRoutes from './AdminRoutes';
import Logo from '../assets/logo.jpg';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import CloseIcon from '@material-ui/icons/Close';
import Auth from '../shared/auth';
import HomeIcon from '@material-ui/icons/Home';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      width: '100%'
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      width: 'calc(100% - 240px)'
    },
    closeMenuButton: {
      marginRight: 'auto',
      marginLeft: 0,
    },
    title: {
        marginLeft: 10,
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
    },
    icon: {
        fill: '#fff',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    itemMenu: {
        color: '#0d5fb6',
        marginLeft: 10,
    }
  }));

export default function Main() {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen)
    }

    const logout = (event) => {
        event.preventDefault();
        handleClose();
        Auth.logout();
        history.push('/login');
    }

    const drawer = (
        <div>
            <List>
                <Typography className={classes.itemMenu} variant="overline" color="inherit" noWrap>
                    Navigation
                </Typography>

                <Link
                    to="/users"
                    style={{ textDecoration: 'none', color: '#757575' }}>
                    <ListItem button key="1">
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>
                </Link>

                <List>
                    <Link
                        to="#"
                        onClick={logout}
                        style={{ textDecoration: 'none', color: '#757575' }}>
                        <ListItem button key="8">
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </Link>
                </List>
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    
                    <img aria-hidden="true" alt="Logo" src={Logo} width="50px"/>
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                        <Link to="/" className={classes.link}>
                            LinqPal
                        </Link>
                    </Typography>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            
            <nav className={classes.drawer}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
                            <CloseIcon/>
                        </IconButton>
                        {drawer}
                    </Drawer>
                </Hidden>

                <Hidden xsDown implementation="css">
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.toolbar} />
                        {drawer}
                    </Drawer>  
                </Hidden>
            </nav>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <main>
                    <MainRoutes />
                </main>
            </div>
        </div>
    );
}
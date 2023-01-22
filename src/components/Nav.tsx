import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { render } from '@testing-library/react';

export const Nav = () => {
    const navigate = useNavigate();
    //   const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [userLogin, setUserLogin] = useState<boolean>(auth.currentUser != null);

    //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setAuth(event.target.checked);
    //   };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        handleClose();
        setUserLogin(false);
        auth.signOut();
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }

    const login = () => {
        handleClose();
        setUserLogin(true);
        navigate('/auth/login');
    }
    // 
    return (
        <Box sx={{ flexGrow: 1 }}>
            <FormGroup>
            </FormGroup>
            <AppBar position="static">
                <Toolbar className='ezerColor' >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Photos
                    </Typography>
                    {(
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                {userLogin ? <img src='${auth.currentUser?.photoURL}'/> : <AccountCircle />}

                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {userLogin && <MenuItem onClick={logout}> Logout </MenuItem>}
                                {!userLogin && <MenuItem onClick={login}>Login</MenuItem>}
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

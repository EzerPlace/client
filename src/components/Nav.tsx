/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/alt-text */
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
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import CardMedia from '@mui/material/CardMedia';

export const Nav = () => {
    {
        <img src='${https://www.google.com/imgres?imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D112156168649&imgrefurl=https%3A%2F%2Fwww.facebook.com%2Fpages%2FEZER-MIZION-%2F112156168649%2F&tbnid=PjzuxDd0lm5w4M&vet=12ahUKEwjwtv6K4uz8AhVCpycCHeslBHYQMygBegQIARA_..i&docid=6SeqV_SKbCfa3M&w=1332&h=1332&q=ezer%20mizion%20icon&ved=2ahUKEwjwtv6K4uz8AhVCpycCHeslBHYQMygBegQIARA_
        }'/>
    }
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [userLogin, setUserLogin] = useState<boolean>(auth.currentUser != null);

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
                        EzerPlace
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
                                {userLogin ? <img src='${auth.currentUser?.photoURL}' /> : <AccountCircle />}

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

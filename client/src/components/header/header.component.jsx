import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import './header.component.scss';

import MenuIcon from '@material-ui/icons/Menu';

export const Header = ({isLoggedIn = false, dispatch}) => {

  const signOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch({type: 'clearGlobalStore'})
  }

  const signIn = () => <Redirect to="/login"/>
  
  return (<AppBar className="header" position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" className="header__title"><Link to="/">Time to learn</Link></Typography>
      <Button color="inherit" onClick={isLoggedIn ? signOut : signIn} className="header__login">{ isLoggedIn ? 'sign out' : 'login' }</Button>
    </Toolbar>
  </AppBar>
);
}

import React, { useState } from 'react';
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

export const Header = ({isLoggedIn = false}) => (
  <AppBar className="header" position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" className="header__title"><Link to="/">Time to learn</Link></Typography>
      <Button color="inherit" className="header__login"><Link to="/login">{ isLoggedIn ? 'signout' : 'login' }</Link></Button>
    </Toolbar>
  </AppBar>
);

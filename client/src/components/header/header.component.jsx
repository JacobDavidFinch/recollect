import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';
import './header.component.scss';

import MenuIcon from '@material-ui/icons/Menu';

export const Header = ({isLoggedIn = false, dispatch}) => {
  const [openMenu, setOpenMenu] = useState(false)

  const signOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch({type: 'clearGlobalStore'})
  }

  const signIn = () => <Redirect to="/login"/>
  const handleClose = () => setOpenMenu(false);
  
  return (<AppBar className="header" position="static">
    <Toolbar>
      <div>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpenMenu(true)}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          className="header__popover"
          keepMounted
          open={openMenu}
          onClose={() => setOpenMenu(false)}
        >
          <Link to=""><MenuItem onClick={handleClose}>Home</MenuItem></Link>
          <Link to="/create-card"><MenuItem onClick={handleClose}>Create Card</MenuItem></Link>
          <Link to="/create-test"><MenuItem onClick={handleClose}>Create Test</MenuItem></Link>
          <Link to="/edit-cards"><MenuItem onClick={handleClose}>Edit Cards</MenuItem></Link>
          <Link to="/test"><MenuItem onClick={handleClose}>Test</MenuItem></Link>
        </Menu>
      </div>
      <Typography variant="h6" className="header__title"><Link to="/">Time to learn</Link></Typography>
      <Button color="inherit" onClick={isLoggedIn ? signOut : signIn} className="header__login">{ isLoggedIn ? 'sign out' : 'login' }</Button>
    </Toolbar>
  </AppBar>
);
}

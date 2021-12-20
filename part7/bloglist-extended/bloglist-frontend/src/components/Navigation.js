import { Link } from 'react-router-dom';
import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';

const Navigation = ({ user, handleLogout }) => {
  return (
    <AppBar position='static'>
      <Toolbar disableGutters>
        <Link to='/'>Blogs</Link>
        <Link to='/users'>Users</Link>
        <>
          {!user?.name ? '' : `Logged in as ${user?.name}`}
          <Button id='logout' onClick={handleLogout}>
            {!user?.name ? '' : 'Logout'}
          </Button>
        </>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;

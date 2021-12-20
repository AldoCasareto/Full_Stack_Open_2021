import React from 'react';
import { Link } from 'react-router-dom';
import { TableContainer, TableRow, TableCell, Paper } from '@material-ui/core';

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        {users.map((user) => (
          <TableRow key={user.id}>
            <Link to={`/users/${user.id}`}>
              <TableCell> {user.name}</TableCell>
            </Link>
            <TableCell> {user.blogs.length}</TableCell>
          </TableRow>
        ))}
      </TableContainer>
    </div>
  );
};

export default Users;

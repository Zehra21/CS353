import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if you're using it for routing

const Navbar = ({ id }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Fitness App
        </Typography>
        <Button component={Link} to={`/homepage/${id}`} color="inherit">Home</Button>
        <Button component={Link} to={`/workouts-member/${id}`} color="inherit">Workouts</Button>
        <Button component={Link} to={`/workoutLogs/${id}`} color="inherit">Workout Logs</Button>
        <Button component={Link} to={`/trainers/${id}`} color="inherit">Trainers</Button>
        <Button component={Link} to={`/members/${id}`} color="inherit">My Profile</Button>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  id: PropTypes.string.isRequired, 
};

export default Navbar;

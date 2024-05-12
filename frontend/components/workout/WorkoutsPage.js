import React, { useState, useEffect } from 'react';
import { DataGrid, GridActionsCell } from '@mui/x-data-grid'; // Import Material-UI Data Grid
import { getWorkouts } from '../../api/axiosConfig'; // Import getWorkouts function
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../navbar';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import WorkoutCreatePage from './WorkoutCreatePage';
import Button from '@mui/material/Button';
import { DialogContent } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { GridToolbar } from '@mui/x-data-grid';
import { set } from 'react-hook-form';
import { deleteWorkout } from '../../api/axiosConfig';

const Workout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []); // Fetch workouts on component mount

  const fetchWorkouts = async () => {
    try {
      const response = await getWorkouts(); // Call the getWorkouts function
      // Add unique IDs to each row
      const workoutsWithIds = response.data.map((workout, index) => ({
        ...workout,
        id: index + 1 // Generate unique ID (assuming index starts from 0)
      }));
      setWorkouts(workoutsWithIds); // Set the workouts state with the data from the response
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    fetchWorkouts(); // Fetch updated workouts
  };



  const handleDelete = (id) => {
    // Call the deleteWorkout function with the workout ID
    deleteWorkout(id)
      .then(response => {
        // Handle successful deletion
        console.log('Workout deleted successfully:', response);
        // Fetch updated list of workouts
        fetchWorkouts();
      })
      .catch(error => {
        // Handle error
        console.error('Error deleting workout:', error);
        fetchWorkouts();
      });
      
  };

  // Define columns for the Data Grid
  const columns = [
    { field: 'workoutID', headerName: 'ID', width: 50, align: 'center', headerAlign: 'center' },
    { field: 'workoutTitle', headerName: 'Title', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'trainerID', headerName: 'Trainer ID', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'workoutType', headerName: 'Type', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'workoutDescription', headerName: 'Description', width: 150, align: 'center', headerAlign: 'center'},
    { field: 'equipments', headerName: 'Equipments', width: 150, align: 'center', headerAlign: 'center'},
    { field: 'targetAudience', headerName: 'Target Audience', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'workoutEstimatedTime', headerName: 'Estimated Time', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'caloriesBurnPerUnitTime', headerName: 'Calories Burnt', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'intensityLevel', headerName: 'Intensity Level', width: 130, align: 'center', headerAlign: 'center' },
  ];

  return (
    <>
      <Navbar />
      <Grid container>
        <Grid item xs={12}>
          <h1 style={{ textAlign: 'center' }}>Workouts</h1>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <WorkoutCreatePage trainerId={1} onClose={() => handleCloseDialog()} />
          </Dialog>
          <button onClick={() => setOpen(true)} style={{ padding: '10px', margin: '10px', fontSize: '16px', cursor: 'pointer' }}>Create Workout</button>
        </Grid>
      </Grid>
      <div style={{ height: 400, width: '80%', margin: '0 auto', textAlign: 'center' }}>
        <DataGrid
          rows={workouts}
          columns={columns.map((column) => ({
            ...column,
            align: 'center' // Set alignment to center for all columns
          }))}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          onRowClick={(row) => {
            setSelectedWorkout(row);
            console.log('Row clicked:', row);
          }}
        />
      </div>
      <Grid container>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(selectedWorkout?.row.workoutID)}
            disabled={!selectedWorkout}
          >
            Delete Workout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Workout;
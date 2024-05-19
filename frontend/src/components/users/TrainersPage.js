import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getTrainers } from '../../api/axiosConfig';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Navbar from '../navbar';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { DialogContent } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContentText } from '@mui/material';
import ConsultationDate from './ConsultationDate';

const Trainers = () => {
    const [trainers, setTrainers] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {
        console.log(userId);
        try {
            const response = await getTrainers();
            console.log(response.data);
            const trainersWithIds = response.data.map((trainer, index) => ({
                ...trainer,
                id: index + 1
            }));
            setTrainers(trainersWithIds);
        } catch (error) {
            console.error('Error fetching trainers:', error);
        }
    };

    const handleOpenDialog = (trainer) => {
        setSelectedTrainer(trainer);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedTrainer(null);
    };

    const columns = [
        { field: 'fullName', headerName: 'Full Name', width: 150, align: 'center', headerAlign: 'center' },
        {
            field: 'trainerDescription',
            headerName: 'Description',
            width: 230,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        { field: 'specialization', headerName: 'Specialization', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'trainerExperience', headerName: 'Experience', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'trainerRating', headerName: 'Rating', width: 100, align: 'center', headerAlign: 'center' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button variant="contained" color="primary" onClick={() => handleOpenDialog(params.row)}>
                    Consultate
                </Button>
            ),
        },
    ];

    return (
        <>
            <Navbar />
            <Grid container>
                <Grid item xs={12}>
                    <h1 style={{ textAlign: 'center' }}>Trainers</h1>
                </Grid>
            </Grid>
            <div style={{ height: 400, width: '80%', margin: '0 auto', textAlign: 'center' }}>
                <div style={{ marginBottom: '10px' }}>
                    <div>
                        <label>
                            Search by Name:
                            <input type="text" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} placeholder="Enter workout title" />
                        </label>
                    </div>
                </div>
                <DataGrid
                    rows={trainers}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                />
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Consultation Date Selector</DialogTitle>
                <DialogContent>
                    {selectedTrainer && (
                        <ConsultationDate
                            trainerID={selectedTrainer.trainerID}
                            onClose={(selectedDate) => {
                                console.log('Selected date:', selectedDate);
                                handleCloseDialog();
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Trainers;

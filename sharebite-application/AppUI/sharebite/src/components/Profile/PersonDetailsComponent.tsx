import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Card, CardContent, Snackbar, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import NavbarComponent from '../Navbar/NavbarComponent';
import { User } from '../../models/User';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../../store/user-slice';
// Placeholder functions
import { updateUserData } from '../../services/api.service.users';
import Swal from 'sweetalert2';

const PersonDetailsComponent = () => {

  const user: User = useSelector(selectUser());
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const [editableUser, setEditableUser] = useState<User>({ ...user });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setEditableUser({
      ...editableUser, [name]: value
    });
  };

  const handleEditClick = () => {
    if(isEditing) {
      undoChanges();
      setIsEditing(false);
    }
    else {
      setIsEditing(true);
    }
  }

  // handle submit click
  const handleSubmit = (event: any) => {
    event.preventDefault();

    updateUserData(editableUser)
      .then((response) => {
        if (response.ok) {
          response.json().then((data: User) => {
            dispatch(setUser(data));
          });
          Swal.fire({
            icon: 'success',
            title: 'User data updated successfully',
            showConfirmButton: false,
            timer: 1500
          });
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Error updating user data',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch((error) => {
        console.log('Error updating user data:', error);
      });
    
    setIsEditing(false);
  };

  // undo changes
  const undoChanges = () => {
    setEditableUser({ ...user });
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ m: 3 }}>
        <h2>Account Details</h2>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth required name="firstName" label="First Name" value={editableUser.firstName} onChange={handleChange} disabled={!isEditing}  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth required name="lastName" label="Last Name" value={editableUser.lastName} onChange={handleChange} disabled={!isEditing} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth required name="email" label="Email" value={editableUser.email} onChange={handleChange} disabled={!isEditing} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth required name="contact" label="Contact" value={editableUser.contact} onChange={handleChange} disabled={!isEditing} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth name="dob" label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} value={editableUser.dob} onChange={handleChange} disabled={!isEditing} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row name="gender" value={editableUser.gender} onChange={handleChange} >
                <FormControlLabel value="Male" control={<Radio />} label="Male" disabled={!isEditing} />
                <FormControlLabel value="Female" control={<Radio />} label="Female" disabled={!isEditing} />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
            {isEditing && <Button variant="contained" color="primary" startIcon={<SaveIcon />} type="submit" sx={{ ml: 1 }}>
              Save
            </Button>}
          </Grid>
        </Grid>
      </Box>
    </>
  );

};

export default PersonDetailsComponent;
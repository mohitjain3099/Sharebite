import { Box, Button, Chip, Divider, Grid, TextField, Typography } from "@mui/material";
import { User } from "../../models/User";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../store/user-slice";
import { useEffect, useState } from "react";
import { updateUserData } from "../../services/api.service.users";
import Swal from "sweetalert2";
import '../../dist/login.css';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';


export default function PartnerDetailsComponent() {

    const user: User = useSelector(selectUser());
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const [editableUser, setEditableUser] = useState<User>({ ...user });
    const [editableaddress, setEditableAddress] = useState<User['address']>({ ...user.address });
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setEditableUser({
            ...editableUser, [name]: value
        });
    };

    // Handle location change
    const handleLocationChange = (event: any) => {
        const { name, value } = event.target;
        console.log('name:', name, 'value:', value);

        setEditableAddress({
            ...editableaddress, [name]: value
        });
        setEditableUser({
            ...editableUser, address: editableaddress
        });
    }

    // Handle edit click
    const handleSubmit = (event: any) => {
        event.preventDefault();

        // Update user data in database
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

    const undoChanges = () => {
        setEditableUser({ ...user });
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} sx={{ m: 3 }}>
                <h2>Account Details</h2>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth required name="name" label="name" value={editableUser.name} onChange={handleChange} disabled={!isEditing} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth required name="contact" label="Contact" value={editableUser.contact} onChange={handleChange} disabled={!isEditing} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth required name="email" label="Email" value={editableUser.email} onChange={handleChange} disabled={!isEditing} />
                    </Grid>
                    <Grid item xs={12} sm={6}>

                    </Grid>

                    <Grid item xs={12}>
                        <Divider>
                            <Chip label="Location" size="medium" />
                        </Divider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth required name="streetName" label="Street Name" value={editableaddress.streetName} onChange={handleLocationChange} disabled={!isEditing} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth required name="area" label="Area" value={editableaddress.area} onChange={handleLocationChange} disabled={!isEditing} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth required name="city" label="City" value={editableaddress.city} onChange={handleLocationChange} disabled={!isEditing} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth required name="pinCode" label="Pin Code" value={editableaddress.pinCode} onChange={handleLocationChange} disabled={!isEditing} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth required name="state" label="State" value={editableaddress.state} onChange={handleLocationChange} disabled={!isEditing} />
                    </Grid>
                    <Grid item xs={12} sm={6}>

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
    )
}
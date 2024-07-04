import { Box, Button, Grid, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../store/user-slice";
import { User } from "../../models/User";
import { validatePassword, validateEmail, validateConfirmPassword } from '../utility';
import { on } from "events";
import Swal from "sweetalert2";
import {updateUserData} from "../../services/api.service.users";

export default function ChangePassword() {
    const [isEditing, setIsEditing] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [oldPasswordError, setOldPasswordError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const dispatch = useDispatch();
    const user: User = useSelector(selectUser());

    // function to validate form
    const validateForm = () => {
        return passwordError && confirmPasswordError;
    }

    // function to change old password
    const onOldPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pass = event.target.value;
        setOldPassword(pass);
    }

    // function to change new password
    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pass = event.target.value;
        setNewPassword(pass);
        setPasswordError(pass.length > 0 && !validatePassword(pass));
    }

    // function to change confirm new password
    const onConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPassword = event.target.value;
        setConfirmNewPassword(confirmPassword);
        setConfirmPasswordError(confirmPassword.length > 0 && !validateConfirmPassword(newPassword, confirmPassword));
    }

    // function to validate old password
    const validateOldPassword = () => {
        setOldPasswordError(user.password === oldPassword);
    }


    // function to handle submit
    const handleSubmit = (event: any) => {
        event.preventDefault();
        validateOldPassword();
        console.log('oldPasswordError:', oldPasswordError);

        if (!oldPasswordError) {
            Swal.fire({
                icon: 'error',
                title: 'Incorrect old password',
                showConfirmButton: true,
            });
        }
        else {
            updateUserData({ ...user, password: newPassword })
            .then((response) => {
                // Handle the case when the response is ok
                if (response.ok) {
                    response.json().then((data: User) => {
                        dispatch(setUser(data));
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'Password updated successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else {
                    // Handle the case when the response is not ok and return a default value
                    Swal.fire({
                        icon: 'error',
                        title: 'Error updating password',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
            setIsEditing(false);
        }
    }

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <h2>Change Password: </h2>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="oldPassword"
                            name="oldPassword"
                            label="Old Password"
                            type="password"
                            fullWidth
                            autoComplete="current-password"
                            onChange={onOldPasswordChange}
                            value={oldPassword}
                            disabled={!isEditing}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="New Password"
                            type="password"
                            fullWidth
                            autoComplete="new-password"
                            onChange={onPasswordChange}
                            value={newPassword}
                            disabled={!isEditing}
                            inputProps={{
                                pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$",
                                title: "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long.",
                                sx: { borderColor: passwordError ? '#FD514E' : '' }
                            }}
                            error={passwordError}
                            helperText={passwordError ? "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long." : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm New Password"
                            type="password"
                            fullWidth
                            autoComplete="new-password"
                            onChange={onConfirmPasswordChange}
                            value={confirmNewPassword}
                            disabled={!isEditing}
                            inputProps={{
                                pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$",
                                title: "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long.",
                                sx: { borderColor: confirmPasswordError ? '#FD514E' : '' }
                            }}
                            error={confirmPasswordError}
                            helperText={confirmPasswordError ? "Passwords do not match." : ""}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? 'Cancel' : 'Update Password'}
                        </Button>
                        {isEditing && <Button variant="contained" color="primary" startIcon={<SaveIcon />} type="submit" sx={{ ml: 1 }} onClick={handleSubmit}>
                            Save
                        </Button>}
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
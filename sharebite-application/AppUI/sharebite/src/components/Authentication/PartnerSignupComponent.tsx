import { useEffect, useState } from "react";
import { PartnerUser } from "../../models/User";
import { validatePassword, validateEmail, validateConfirmPassword } from '../utility';
import { Box, Checkbox, Chip, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

export default function PartnerSignupComponent({ userData, setUserData, setValidation }: { userData: PartnerUser, setUserData: (userData: PartnerUser) => void, setValidation: any }) {

    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [termsAndConditions, setTermsAndConditions] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [contactError, setContactError] = useState(false);
    const [roleError, setRoleError] = useState(false);
    const [streetNameError, setStreetNameError] = useState(false);
    const [areaError, setAreaError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [stateError, setStateError] = useState(false);
    const [pinCodeError, setPinCodeError] = useState(false);

    // Function to validate the form
    function validateForm(): boolean {
        return !emailError && !confirmPasswordError && !passwordError && termsAndConditions && !nameError && !contactError && !roleError && !streetNameError && !areaError && !cityError && !stateError && !pinCodeError;
    }

    // Function to validate the password
    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;
        setUserData({ ...userData, password });
        setPasswordError(password.length > 0 && !validatePassword(password));
    }

    // Function to validate the confirm password
    const onConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPassword = event.target.value;
        validateConfirmPassword(userData.password, confirmPassword);
        setConfirmPasswordError(confirmPassword.length > 0 && !validateConfirmPassword(userData.password, confirmPassword));
    }

    // Function to validate the email
    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value;
        setUserData({ ...userData, email });
        setEmailError(email.length > 0 && !validateEmail(email));
    }

    // Function to validate the form on change
    useEffect(() => {
        setValidation(validateForm());
    }, [userData.email, userData.password, termsAndConditions, nameError, contactError, roleError, streetNameError, areaError, cityError, stateError, pinCodeError, confirmPasswordError]);

    return (
        <>
            <Box width={'100%'}>
                <Typography component="div" color={'gray'} fontWeight={'lighter'} mt={'5%'} mb={'4%'} fontSize={10}>
                    (Partner Sign-in for NGOs or Restaurent who would like to contribute in the community by helping us sharing food or by donating to the needy using our website<span style={{ color: 'red' }}>*</span>)
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Name"
                            fullWidth
                            autoComplete="name"
                            value={userData.name}
                            onChange={(e) => {
                                setUserData({ ...userData, name: e.target.value });
                                e.target.value.length === 0 ? setNameError(true) : setNameError(false);
                            }}
                            error={nameError}
                            helperText={userData.name.length === 0 ? "Name is required" : ""}
                            onBlurCapture={(e) => userData.name.length === 0 ? setNameError(true) : setNameError(false)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="contact"
                            name="contact"
                            label="Contact Number"
                            type="number"
                            fullWidth
                            autoComplete="phone"
                            value={userData.contact}
                            onChange={(e) => {setUserData({ ...userData, contact: e.target.value });
                            e.target.value.length !== 10 ? setContactError(true) : setContactError(false)}}
                            error={contactError}
                            helperText={userData.contact.length > 0 && contactError ? "Contact number should be 10 digits" : ""}
                        />
                    </Grid>

                    <Grid item xs={12}>
                    <Typography component="div" color={'gray'} fontWeight={'lighter'} mt={'1%'} mb={'2%'} fontSize={10}>
                        (Please provide your role. This will help us to understand your contribution in the community*)
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel required id="role-lbl">Role</InputLabel>
                        <Select
                            labelId="role-lbl"
                            id="role"
                            value={userData.role}
                            label="Role"
                            required
                            fullWidth
                            onChange={(e) => {setUserData({ ...userData, role: e.target.value });
                        e.target.value.length === 0 ? setRoleError(true) : setRoleError(false)}}
                            error={roleError}
                            onBlurCapture={(e) => userData.role.length === 0 ? setRoleError(true) : setRoleError(false)}
                        >
                            <MenuItem value={'restaurent'}>Restaurent</MenuItem>
                            <MenuItem value={'ngo'}>NGO</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                    <Grid item xs={12}>
                        <Divider>
                            <Chip label="Address" size="small" />
                        </Divider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="streetName"
                            name="streetname"
                            label="Street Name"
                            fullWidth
                            autoComplete="address-line1"
                            value={userData.address.streetName}
                            onChange={(e) => {setUserData({ ...userData, address: { ...userData.address, streetName: e.target.value } });
                            e.target.value.length === 0 ? setStreetNameError(true) : setStreetNameError(false)}
                            }
                            error={streetNameError}
                            helperText={streetNameError ? "Street Name is required" : ""}
                            onBlurCapture={(e) => userData.address.streetName.length === 0 ? setStreetNameError(true) : setStreetNameError(false)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="area"
                            name="area"
                            label="Area"
                            fullWidth
                            autoComplete="address-line2"
                            value={userData.address.area}
                            onChange={(e) => {setUserData({ ...userData, address: { ...userData.address, area: e.target.value } }); 
                            e.target.value.length === 0 ? setAreaError(true) : setAreaError(false)}
                            }
                            error={areaError}
                            helperText={areaError ? "Area is required" : ""}
                            onBlur={(e) => userData.address.area.length === 0 ? setAreaError(true) : setAreaError(false)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            autoComplete="city"
                            value={userData.address.city}
                            onChange={(e) => {setUserData({ ...userData, address: { ...userData.address, city: e.target.value } });
                            e.target.value.length === 0 ? setCityError(true) : setCityError(false)}
                            }
                            error={cityError}
                            helperText={cityError ? "City is required" : ""}
                            onBlurCapture={(e) => userData.address.city.length === 0 ? setCityError(true) : setCityError(false)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="state"
                            name="state"
                            label="State"
                            fullWidth
                            autoComplete="state"
                            value={userData.address.state}
                            onChange={(e) => {setUserData({ ...userData, address: { ...userData.address, state: e.target.value } });
                            e.target.value.length === 0 ? setStateError(true) : setStateError(false)}
                            }
                            error={stateError}
                            helperText={stateError ? "State is required" : ""}
                            onBlurCapture={(e) => userData.address.state.length === 0 ? setStateError(true) : setStateError(false)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="pincode"
                            name="pincode"
                            label="Pincode"
                            type="number"
                            fullWidth
                            autoComplete="pincode"
                            value={userData.address.pinCode}
                            onChange={(e) => {setUserData({ ...userData, address: { ...userData.address, pinCode: e.target.value } });
                            e.target.value.length === 0 ? setPinCodeError(true) : setPinCodeError(false)}
                            }
                            error={pinCodeError}
                            helperText={pinCodeError ? "Pincode is required" : ""}
                            onBlurCapture={(e) => userData.address.pinCode.length === 0 ? setPinCodeError(true) : setPinCodeError(false)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="email"
                            onChange={onEmailChange}
                            value={userData.email}
                            error={emailError}
                            helperText={emailError ? "Please enter valid email Id" : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            autoComplete="new-password"
                            onChange={onPasswordChange}
                            value={userData.password}
                            inputProps={{
                                pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$",
                                title: "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long."
                            }}
                            error={passwordError}
                            helperText={passwordError ? "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long." : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            autoComplete="new-password"
                            onChange={onConfirmPasswordChange}
                            error={confirmPasswordError}
                            helperText={confirmPasswordError ? "Password do not match" : ""}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" checked={termsAndConditions} onChange={(e)=>setTermsAndConditions(e.target.checked)} />}
                            label="I agree to the terms and conditions."
                        />
                    </Grid>

                </Grid>
            </Box>
        </>
    );
}
import { useEffect, useState } from "react";
import { IndividualUser } from "../../models/User";
import dayjs, { Dayjs } from "dayjs";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "../utility";

export default function IndividualSignupComponent({
  userData,
  setUserData,
  setValidate,
}: {
  userData: IndividualUser;
  setUserData: any;
  setValidate: any;
}) {
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs("2000-01-01"));
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [dobError, setDobError] = useState(false);

  // Function to validate the form
  function validateForm(
    email: string,
    password: string,
    confirmPassword: string
  ): boolean {
    return (
      validateEmail(email) &&
      validatePassword(password) &&
      validateConfirmPassword(password, confirmPassword) &&
      termsAndConditions &&
      !firstNameError &&
      !lastNameError &&
      !roleError &&
      !genderError &&
      !dobError
    );
  }

  // Function to handle the change in the password field
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setUserData({ ...userData, password });
    setPasswordError(password.length > 0 && !validatePassword(password));
  };

  // Function to handle the change in the confirm password field
  const onConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPassword = event.target.value;
    validateConfirmPassword(userData.password, confirmPassword);
    setConfirmPasswordError(
      confirmPassword.length > 0 &&
        !validateConfirmPassword(userData.password, confirmPassword)
    );
  };

  // Function to handle the change in the email field
  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setUserData({ ...userData, email });
    setEmailError(email.length > 0 && !validateEmail(email));
  };

  // Function to handle the change in the date of birth field
  const handleDateChange = (date: Dayjs | null) => {
    // Format the date to 'yyyy-mm-dd'
    const formattedDate = date?.toISOString().split("T")[0];

    const today = dayjs().startOf("day");
    const selectedDate = date?.startOf("day");

    if (selectedDate && selectedDate.isAfter(today)) {
      setDobError(true);
    } else {
      setDobError(false);
    }
    setDate(date);
    setUserData({ ...userData, dob: formattedDate });
  };

  useEffect(() => {
    setValidate(
      validateForm(userData.email, userData.password, userData.password)
    );
  }, [
    userData.email,
    userData.password,
    termsAndConditions,
    firstNameError,
    lastNameError,
    roleError,
    genderError,
    dobError,
  ]);

  return (
    <Box width={"100%"}>
      <Typography
        component="div"
        color={"gray"}
        fontWeight={"lighter"}
        mt={"5%"}
        mb={"4%"}
        fontSize={10}
      >
        (Individual Sign-in for regular users who would like to contribute in
        the community by sharing their food or by donating to the needy
        <span style={{ color: "red" }}>*</span>)
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            value={userData.firstName}
            onChange={(e) => {
              setUserData({ ...userData, firstName: e.target.value });
              e.target.value.length > 0
                ? setFirstNameError(false)
                : setFirstNameError(true);
            }}
            error={firstNameError}
            helperText={firstNameError ? "Please enter first name" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            value={userData.lastName}
            onChange={(e) => {
              setUserData({ ...userData, lastName: e.target.value });
              e.target.value.length > 0
                ? setLastNameError(false)
                : setLastNameError(true);
            }}
            error={lastNameError}
            helperText={lastNameError ? "Please enter last name" : ""}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography
            component="div"
            color={"gray"}
            fontWeight={"lighter"}
            mt={"1%"}
            mb={"2%"}
            fontSize={10}
          >
            (Please provide your role. This will help us to understand your
            contribution in the community*)
          </Typography>
          <FormControl fullWidth>
            <InputLabel required id="role-lbl">
              Role
            </InputLabel>
            <Select
              labelId="role-lbl"
              id="role"
              value={userData.role}
              label="Role"
              required
              fullWidth
              onChange={(e) => {
                setUserData({ ...userData, role: e.target.value });
                e.target.value.length > 0
                  ? setRoleError(false)
                  : setRoleError(true);
              }}
              error={roleError}
              onBlurCapture={(e) => {
                userData.role.length > 0
                  ? setRoleError(false)
                  : setRoleError(true);
              }}
            >
              <MenuItem value={"regularUser"}>Regular User</MenuItem>
              <MenuItem value={"delivery"}>Delivery</MenuItem>
              <MenuItem value={"helper"}>Helper</MenuItem>
              <MenuItem value={"supplier"}>Supplier</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth (MM/DD/YYYY)"
              value={date}
              onChange={(newDate) => handleDateChange(newDate)}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="gender-lbl">Gender</InputLabel>
            <Select
              labelId="gender-lbl"
              id="gender"
              value={userData.gender}
              label="Gender"
              required
              fullWidth
              onChange={(e) => {
                setUserData({ ...userData, gender: e.target.value });
                e.target.value.length > 0
                  ? setGenderError(false)
                  : setGenderError(true);
              }}
              error={genderError}
              onBlurCapture={(e) =>
                userData.gender.length > 0
                  ? setGenderError(false)
                  : setGenderError(true)
              }
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="contact"
            name="contact"
            label="Contact Number (Optional)"
            fullWidth
            type="number"
            autoComplete="phone"
            value={userData.contact}
            onChange={(e) => {
              setUserData({ ...userData, contact: e.target.value });
              e.target.value.length === 10
                ? setFirstNameError(false)
                : setFirstNameError(true);
            }}
            error={firstNameError}
            helperText={
              userData.contact.length > 0 && firstNameError
                ? "Please enter contact number of 10 digits"
                : ""
            }
          />
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
              title:
                "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long.",
            }}
            error={passwordError}
            helperText={
              passwordError
                ? "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long."
                : ""
            }
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
            helperText={confirmPasswordError ? "Passwords do not match" : ""}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                checked={termsAndConditions}
                onChange={(e) => setTermsAndConditions(e.target.checked)}
              />
            }
            label="I agree to the terms and conditions."
          />
        </Grid>
      </Grid>
    </Box>
  );
}

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IndividualUser, PartnerUser } from '../../models/User';
import { Location } from '../../models/Media';
import IndividualSignupComponent from './IndividualSignupComponent';
import PartnerSignupComponent from './PartnerSignupComponent';
import * as userServices from '../../services/api.service.users';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { login } from '../../store/user-slice';
import { DialogProps } from '../../interfaces/DialogProps';
import Constants from '../../AppConstants';

export default function SignupComponent({ open, handleClose }: DialogProps) {
  const [tabValue, setTabValue] = React.useState(0);
  const [validateData, setValidateData] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [individualUserData, setIndividualUserData] = React.useState({
    firstName: '',
    lastName: '',
    gender: '',
    role: '',
    dob: new Date().toISOString().split('T')[0] as unknown as Date,
    contact: '',
    email: '',
    password: '',
    type: Constants.INDIVIDUAL_USER,
  } as IndividualUser);

  const [partnerUserData, setPartnerUserData] = React.useState({
    name: '',
    contact: '',
    address: {
      streetName: '',
      area: '',
      city: '',
      state: '',
      pinCode: '',
      coordinates: '',
    } as Location,
    email: '',
    role: '',
    password: '',
    type: Constants.PARTNER_USER,
  } as PartnerUser);

  const onSubmitForm = () => {
    const userData = tabValue === 0 ? individualUserData : partnerUserData;
    userServices
      .saveUserData(userData)
      .then((response) => {
        if (response.ok) {
          response.json().then((data: any) => {
            if (data) {
              dispatch(login(data));
              Swal.fire({
                icon: 'success',
                title: 'User registered and loggedIn successfully',
                showConfirmButton: false,
                timer: 1500,
              });
              window.scrollTo(0, 0);
              navigate('/');
            }
          });
        } else {
          // Handle the case when the response is not ok and return a default value
          console.log('Authentication failed');
          Swal.fire({
            icon: 'error',
            title: 'User registration failed',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <FormControl component='fieldset' onSubmit={onSubmitForm}>
          <Container
            className='signupScreen pd-tb-20'
            maxWidth='lg'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <DialogTitle>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h4' component='div' gutterBottom>
                  Create an Account
                </Typography>
              </Box>
              <Box>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label='icon label tabs example'
                >
                  <Tab icon={<PersonIcon />} label='Individual Sign-in' />
                  <Tab icon={<StoreIcon />} label='Partner Sign-in' />
                </Tabs>
              </Box>
              <IconButton
                aria-label='close'
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'black',
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent>
              {tabValue === 0 ? (
                <IndividualSignupComponent
                  userData={individualUserData}
                  setUserData={setIndividualUserData}
                  setValidate={setValidateData}
                />
              ) : (
                <PartnerSignupComponent
                  userData={partnerUserData}
                  setUserData={setPartnerUserData}
                  setValidation={setValidateData}
                />
              )}
            </DialogContent>

            <DialogActions>
              <Container>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant='caption' component='div' gutterBottom>
                      Already have an account?{' '}
                      <a href='' onClick={handleClose}>
                        Sign In
                      </a>
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    m: 2,
                  }}
                >
                  <Box>
                    <Button
                      type='submit'
                      disabled={!validateData}
                      variant='contained'
                      onClick={onSubmitForm}
                    >
                      Sign Up
                    </Button>
                  </Box>
                </Box>
              </Container>
            </DialogActions>
          </Container>
        </FormControl>
      </Dialog>
    </>
  );
}

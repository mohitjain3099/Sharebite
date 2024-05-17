import React, { useEffect } from 'react';
import { Box, List, Button, ListItemText, Avatar, Typography, Divider } from '@mui/material';
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import PostPageForProfile from './PostPageForProfile';
import PersonDetailsComponent from '../components/Profile/PersonDetailsComponent.tsx';
import NavbarComponent from '../components/Navbar/NavbarComponent.tsx';
import ChangePassword from '../components/Profile/ChangePassword.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../store/user-slice.ts';
import { User } from '../models/User.tsx';
import Constants from '../AppConstants.ts';
import Swal from 'sweetalert2';

// ProfilePage component
const ProfilePage = () => {
  // State variables
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user: User | null = useSelector(selectUser());
  const [userName, setUserName] = React.useState('Guest');
  const [userRole, setUserRole] = React.useState('Guest');

  // Set the user name and role
  useEffect(() => {
    if (user) {
      if (user.type === Constants.INDIVIDUAL_USER) {
        setUserName(user.firstName + ' ' + user.lastName);
      }
      else if (user.type === Constants.PARTNER_USER) {
        setUserName(user.name);
      }
      setUserRole(rolePlaceholder.find(role => role.name === user.role)?.path ?? 'Guest');
    }
  }, []);
  // Check if the user is logged in
  useEffect(() => {
    if (location.pathname === '/Profile') {
      navigate('/Profile/PersonDetails');
    }
  }, [location, navigate]);
  // Menu items
  const menuItems = [
    { name: 'Person Details', path: 'PersonDetails' },
    { name: 'Dashboard', path: 'Dashboard' },
    { name: 'Change Password', path: 'ChangePassword' },
    { name: 'Logout', path: 'Logout' },
  ];
  // Role placeholder
  const rolePlaceholder =[
    { name: 'ngo', path: 'NGO' },
    { name: 'restaurent', path: 'Restaurant' },
    { name: 'delivery', path: 'Delivery Partner' },
    { name: 'admin', path: 'Admin'},
    { name: 'regularUser', path: 'Contributor'},
    { name: 'helper', path: 'Helper'},
    { name: 'supplier', path: 'Supplier'}
  ]
  // Handle the list item click
  const handleListItemClick = (path: string) => {
    if (path === 'Logout') {
      Swal.fire({
        icon: "success",
        title: "User logged out successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(logout());
      navigate('/');
      return;
    }
    navigate(path);
  };
  // Return the JSX for the component
  return (
    <>
      <NavbarComponent />
      <Box display="flex" height="100vh" sx={{ marginTop: '5rem' }}>
        <Box width={1 / 4} p={2} borderRight={1} borderColor="divider" bgcolor="white" sx={{ position: 'fixed', height: '100vh' }}>
          <Avatar sx={{ width: 200, height: 200, mx: 'auto', mb: 5 }} />
          <Typography align="center" gutterBottom variant="h5">{userName}</Typography>
          <Typography align="center" variant="subtitle1">{userRole}</Typography>
          <Box height="1rem" />
          <Divider />
          <Box height="1rem" />
          <List>
            {menuItems.map((item) => {
              const isSelected = location.pathname.includes(item.path);
              return (
                <Button
                  key={item.name}
                  fullWidth
                  onClick={() => handleListItemClick(item.path)}
                  sx={{
                    color: isSelected ? 'white' : 'black',
                    backgroundColor: isSelected ? 'black' : 'transparent',
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                    '&:hover': {
                      backgroundColor: 'black',
                      color: 'white',
                    },
                  }}
                >
                  <ListItemText primary={item.name} />
                </Button>
              );
            })}
          </List>
        </Box>
        <Box width={3 / 4}
          p={2}
          sx={{
            marginLeft: '25%',
          }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
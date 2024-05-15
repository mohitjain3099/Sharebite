import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import SharebiteLogo from "../../static/images/SharebiteLogo.png";
import "../../dist/navbar.css";
import { Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
const buttonNames = ["Home", "Posts", "Events", "Donate"];
import TranslateIcon from "@mui/icons-material/Translate";
import { IconButton } from "@mui/material";
import LanguageSelectorDialogComponent from "../Language/LanguageSelectorComponent";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../store/user-slice";
import { User } from "../../models/User";
import Constants from "../../AppConstants";
import SignupComponent from "../Authentication/SignupComponent";
import Swal from "sweetalert2";
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import GuestImage from '../../static/images/GuestImage.jpg';


// Assign the values to the variables
const profilePicture = null;
const placeholderImage = GuestImage;

// NavbarComponent
export const NavbarComponent = () => {
  // State variables
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const user: User | null = useSelector(selectUser());
  const [userInitials, setUserInitials] = useState("G");
  const [userName, setUserName] = useState("Guest");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Handle the language dialog close
  const handleLanguageDialogClose = () => {
    setOpen(false);
  };
  // Handle the profile click
  const handleProfileClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  // Handle the close
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Handle the donate click
  const handleDonateClick = (event: React.MouseEvent) => {
    if (!user) {
      event.preventDefault();
      Swal.fire({
        icon: "info",
        title: "Please login to donate",
        showConfirmButton: true,
        timer: 1500,
      });
      navigate("/Login");
    }

  }
  // Get the initials
  const getInitials = (name: string) => {
    const names = name.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
  };
  //  Handle the language button click
  const handleLanguageButtonClick = () => {
    setOpen(true);
    console.log("Language button clicked");
  };
  // Handle the login click
  const handleLoginClick = () => {
    navigate("/Login");
    handleClose();
  };
  // Handle the logout click
  const handleLogoutClick = () => {
    // Logout the user
    dispatch(logout());
    navigate("/");
    Swal.fire({
      icon: "success",
      title: "User logged out successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate('/');
    handleClose();
  };
  // Use effect
  useEffect(() => {
    if (user) {
      setUserName(
        user.type === Constants.PARTNER_USER
          ? user.name
          : `${user.firstName} ${user.lastName}`
      );
      setUserInitials(
        user.type === Constants.PARTNER_USER
          ? getInitials(user.name)
          : getInitials(`${user.firstName} ${user.lastName}`)
      );
    } else {
      setUserName("Guest");
      setUserInitials("G");
    }
  }, [user]);
  // Return the JSX
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
      <Toolbar sx={{ display: "flex", alignItems: "center", height: "75px" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          flexGrow={1}
        >
          {buttonNames.map((buttonName) => (
            <Link
              to={buttonName === "Home" ? "/" : `/${buttonName}`}
              key={buttonName}
              onClick={buttonName === "Donate" ? (event) => handleDonateClick(event) : undefined}
            >
              <Button
                sx={{ mx: 5, px: 5, color: "black", borderRadius: "50px" }}
                className="appbar-btn"
              >
                {buttonName}
              </Button>
            </Link>
          ))}
        </Box>

        <Box display={"flex"} alignItems={"center"} gap={2}>
          <IconButton onClick={handleLanguageButtonClick}>
            <TranslateIcon sx={{ color: "white", fontSize: "30px" }} />
          </IconButton>

          <Button onClick={handleProfileClick}>
            <Avatar
              src={
                user
                  ? profilePicture
                    ? profilePicture
                    : undefined
                  : placeholderImage
              }
              sx={{ width: 45, height: 45 }}
              title={userName}
            >
              {!profilePicture && userInitials}
            </Avatar>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{}}
          >
            {user ? (
              [
                <MuiLink component={RouterLink} to="/Profile/Dashboard" sx={{ textDecoration: 'none', color: 'inherit' }} key="Dashboard">
                  <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                </MuiLink>,
                <MuiLink component={RouterLink} to="/Profile" sx={{ textDecoration: 'none', color: 'inherit' }} key="Profile">
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </MuiLink>,
                <MenuItem onClick={handleLogoutClick} key={"Logout"}>
                  Logout
                </MenuItem>,
              ]
            ) : (
              <>
                <MenuItem onClick={handleLoginClick} key={"Login"}>
                  Login
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
      <LanguageSelectorDialogComponent
        handleClose={handleLanguageDialogClose}
        open={open}
      />
    </AppBar>
  );
};

export default NavbarComponent;

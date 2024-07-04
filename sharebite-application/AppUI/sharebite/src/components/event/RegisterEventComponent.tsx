import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, styled } from "@mui/material";
import img from '../../../static/images/event register.jpeg';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from "react";
import { v4 } from "uuid";
import { registerForEvent } from "../../services/api.service.registerForEvent";
// Styles for BootstrapDialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
// RegisterEventComponentProps
interface RegisterEventComponentProps {
    open: boolean;
    handleClose: any;
    eventData: any;
}
// RegisterEventComponent
function RegisterEventComponent({open,handleClose,eventData}: RegisterEventComponentProps) {
    // State variables
    const [Name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [supportAs, setSupportAs] = useState('');
    const [saveDisabled, setSaveDisabled] = useState(true); // State to manage save button disable/enable

    // Function to check if email is valid
    const isEmailValid = (email: string) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to check if all required fields are filled and email is valid
    const isFormValid = () => {
        return (
            Name !== '' &&
            email !== '' &&
            supportAs !== '' &&
            isEmailValid(email)
        );
    };

    // Update save button disabled state whenever any of the required fields change
    React.useEffect(() => {
        setSaveDisabled(!isFormValid());
    }, [Name, email, supportAs]);
    // Handle change
    const handleChange = (event: SelectChangeEvent) => {
        setSupportAs(event.target.value);
    };

    return (
        <>
            <React.Fragment>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    maxWidth="lg"
                    sx={{ 
                        width: '1000px', 
                        height:'550px', 
                        margin: 'auto', 
                        '.MuiPaper-root': { borderRadius: '20px' } // Add borderRadius here
                    }}
                >
                <Box sx={{display: 'flex', flexDirection: 'row', overflow:'hidden'}}>
                    <Box
                    component="div"
                    sx={{
                        width: 460, // specify dimensions
                        height: 686,
                        backgroundImage: `url(${img})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    />
                    <Box sx={{overflow:'auto', 
                        scrollbarColor: '#FD514E #FFFFFF',
                        scrollbarWidth: 'thin'}}>
                        <Box>
                            <DialogTitle sx={{ m: 0, p: 2 ,display:'flex',justifyContent:'center', color:'#FD514E',fontWeight:'bold',fontSize:'40px',fontFamily:'Dancing Script, cursive'}} id="customized-dialog-title">
                                Register for a Event
                            </DialogTitle>
                            <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: '#FD514E',
                            }}
                            >
                            <CloseIcon />
                            </IconButton>
                        </Box>
                        <DialogContent sx={{marginTop:'0px' ,width:'470px', display:'flex', flexDirection:'column'}}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Name"
                                placeholder="Name"
                                sx={{marginTop:'20px', width:'440px'}}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <TextField
                                sx={{marginTop:'20px', width:'440px'}}
                                id="outlined-multiline-static"
                                label="Email"
                                placeholder="Email"
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                error={email !== '' && !isEmailValid(email)}
                                helperText={email !== '' && !isEmailValid(email) ? 'Invalid email' : ''}
                            />
                            <FormControl sx={{ marginTop:'20px', maxWidth: '440px' }}>
                                <InputLabel id="demo-simple-select-helper-label">Support As</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={supportAs}
                                    label="Support As"
                                    onChange={handleChange}
                                    required
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'FoodAvailabilityPost'}>Chef</MenuItem>
                                    <MenuItem value={'RawMaterialPost'}>Kitchen Support</MenuItem>
                                    <MenuItem value={'NGOPromotionalPost'}>Delivery partner</MenuItem>
                                </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions sx={{width:'470px', justifyContent:'center'}}>
                            <Button 
                                sx={{
                                    backgroundColor:'black',
                                    borderRadius: '20px',
                                    '&:hover': {
                                        backgroundColor: '#FD514E',
                                    }
                                }} 
                                variant="contained" 
                                autoFocus 
                                onClick={() => {
                                    const eventDataSchema = {
                                        id: v4(),
                                        Name: Name,
                                        email: email,
                                        supportAs: supportAs,
                                        createdAt: new Date(),
                                        updatedAt: new Date() ,
                                        eventData: eventData
                                    };
                                    registerForEvent(eventDataSchema);
                                    handleClose();
                                }}
                                disabled={saveDisabled} // Disable the button based on state
                            >
                                Save changes
                            </Button>
                        </DialogActions>
                    </Box>
                </Box>
                </BootstrapDialog>
            </React.Fragment>
        </>
    );
}
export default RegisterEventComponent;

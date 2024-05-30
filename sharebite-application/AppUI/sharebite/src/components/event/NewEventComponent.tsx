import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid';
import img from './../../../static/images/event planning.webp';
import { firebaseStorage } from './../../../src/services/api.service.firbase';
import { saveEventData } from '../../services/api.service.saveEvent';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user-slice';
import { User } from '../../models/User';
import { Box } from '@mui/material';
//BootstrapDialog styles
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
// NewPostComponentProps
interface NewPostComponentProps {
  open: boolean;
  handleClose: any;
}
// NewEventComponent
function NewEventComponent({ open, handleClose }: NewPostComponentProps) {
    // State variables
    const user: User | null = useSelector(selectUser());
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [streetName, setStreetName] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [state, setState] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [selectedImageName, setSelectedImageName] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [saveDisabled, setSaveDisabled] = useState(true);
    const [uploadButtonEnabled, setUploadButtonEnabled] = useState(false);
    const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
    // Function to handle image change
    const handleImageChange = async () => {
    if (selectedImage) {
        const imageRef = ref(firebaseStorage, `files/${v4()}`);
        await uploadBytes(imageRef, selectedImage);
        const url = await getDownloadURL(imageRef);
        console.log('Image URL'+url);
        setUploadButtonEnabled(false);
        setImageUrl(url);
    }
    };
    // Function to generate coordinates
    const handleGenerateCoordinates = () => {
        return new Promise((resolve, reject) => {
            console.log('Generating coordinates');
            const address = encodeURIComponent(`${area}, ${city}`);
            console.log('Address:', address);
            const apiKey = 'pk.f4021bcc98376444fc10823bf8d4567f';
            const apiUrl = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${address}&format=json`;
            console.log('API URL:', apiUrl);
            axios.get(apiUrl)
                .then(response => {
                    console.log('Response:', response.data);
                    const { data } = response;
                    if (data && data.length > 0) {
                        console.log('Geolocation:', data[0].lat, data[0].lon);
                        resolve({ lat: data[0].lat.toString(), lng: data[0].lon.toString() });
                    } else {
                        console.error('No results found');
                        reject('No results found');
                    }
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });
    };
    // Function to check if all required fields are filled
    const areAllRequiredFieldsFilled = () => {
        return (
            title !== '' &&
            caption !== '' &&
            streetName !== '' &&
            area !== '' &&
            city !== '' &&
            pinCode !== '' &&
            state !== '' &&
            selectedImage !== null 
        );
    };
    // Update save button disabled state whenever any of the required fields change
    useEffect(() => {
        setSaveDisabled(!areAllRequiredFieldsFilled());
    }, [title, caption, streetName, area, city, pinCode, state, selectedImage]);
  return (
    <React.Fragment>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="lg"
            sx={{ 
                width: '1000px', 
                height:'650px', 
                margin: 'auto',  
                '.MuiPaper-root': { borderRadius: '20px' }
            }}
        >
          <Box sx={{display: 'flex', flexDirection: 'row', overflow:'hidden'}}>
                <Box
                    component="div"
                    sx={{
                        width: 460,
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
                      Create a New Event
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
                        label="Title"
                        placeholder="Title"
                        sx={{marginTop:'20px', width:'440px'}}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <TextField
                        sx={{marginTop:'20px', width:'440px'}}
                        id="outlined-multiline-static"
                        label="Add caption here"
                        multiline
                        rows={4}
                        placeholder="Add caption here"
                        onChange={(event) => setCaption(event.target.value)}
                        required
                    />
                    <TextField
                        sx={{marginTop:'20px', width:'440px'}}
                        id="outlined-required"
                        label="Street Name"
                        placeholder="Street Name"
                        onChange={(event) => setStreetName(event.target.value)}
                        required
                    />
                    <TextField
                        sx={{marginTop:'20px', width:'440px'}}
                        id="outlined-required"
                        label="Area"
                        placeholder="Area"
                        onChange={(event) => setArea(event.target.value)}
                        required
                    />
                    <TextField
                        sx={{marginTop:'20px', width:'440px'}}
                        id="outlined-required"
                        label="City"
                        placeholder="City"
                        onChange={(event) => setCity(event.target.value)}
                        required
                    />
                    <TextField
                        sx={{marginTop:'20px', width:'440px'}}
                        id="outlined-required"
                        label="Zip Code"
                        placeholder="Zip Code"
                        onChange={(event) => setPinCode(event.target.value)}
                        required
                    />
                    <TextField
                        sx={{marginTop:'20px', width:'440px'}}
                        id="outlined-required"
                        label="State"
                        placeholder="State"
                        onChange={(event) => setState(event.target.value)}
                        required
                    />
                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <Box>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                type="file"
                                onChange={(e) => {
                                    setSelectedImage(e.target.files![0]);
                                    setSelectedImageName(e.target.files![0].name);
                                    setUploadButtonEnabled(true);
                                }}
                            />
                            <label htmlFor="raised-button-file">
                                <Button sx={{
                                    backgroundColor:'black',
                                    borderRadius: '20px',
                                    '&:hover': {
                                        backgroundColor: '#FD514E',
                                    },
                                    marginTop:'10px'
                                }} 
                                variant="contained" component="span">
                                    Select Image
                                </Button>
                            </label>
                        </Box>
                        {selectedImageName && <p>{selectedImageName}</p>}
                        <Button disabled={!uploadButtonEnabled} sx={{
                            backgroundColor:'black', 
                            width:'150px', 
                            borderRadius: '20px',
                            marginTop:'10px',
                            '&:hover': {
                                backgroundColor: '#FD514E',
                            }} }
                            variant="contained" component="span" onClick={handleImageChange}>
                            Upload Image
                        </Button>
                    </Box>
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
                        disabled={saveDisabled}
                        onClick={async () => {
                            try {
                                const newCoordinates = await handleGenerateCoordinates();
                                console.log('Coordinates:', coordinates);
                                const eventData = {
                                    id: v4(), 
                                    image: imageUrl,
                                    createdAt: new Date(),
                                    updatedAt: new Date(),
                                    author: (user?.firstName && user?.lastName) ? `${user.firstName} ${user.lastName}` : user?.name, // You need to get the author name here
                                    location: {
                                        id: v4(),
                                        streetName,
                                        area,
                                        city,
                                        pinCode,
                                        state,
                                        coordinates: newCoordinates
                                    },
                                    caption,
                                    title,
                                    isPromoMailSent: 0
                                };
                                console.log(eventData);
                                saveEventData(eventData);
                                handleClose();
                            } catch (error) {
                                console.error('Error:', error);
                            }
                        }
                        }
                    >
                        Save changes
                    </Button>
                </DialogActions>
              </Box>
          </Box>
        </BootstrapDialog>
    </React.Fragment>
  );
}
export default NewEventComponent;
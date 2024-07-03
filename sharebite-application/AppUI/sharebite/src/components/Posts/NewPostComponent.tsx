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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ChangeEvent } from 'react';
import {savePostData} from '../../services/api.service.savepost';
import {firebaseStorage, locationKeyConstant} from '../../services/api.service.firbase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid';
import img from '../../../static/images/pink donut.jpeg';
import WebFont from 'webfontloader';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user-slice';
import { User } from '../../models/User';
import { Box } from '@mui/material';
//Bootstrap Dialog for styling the dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { 
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));  
//WebFont Loader for loading the fonts
WebFont.load({
    google: {
    families: ["Dancing Script", "cursive", "Open Sans", "sans-serif"]
    }
  });
//NewPostComponentProps
interface NewPostComponentProps {
    open: boolean;
    handleClose: any;
}
//NewPostComponent
function NewPostComponent({ open, handleClose }: NewPostComponentProps){
    //useState for the form fields
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [streetName, setStreetName] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [state, setState] = useState('');
    const [shelfLife, setShelfLife] = useState('');
    const [isVeg, setIsVeg] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [mealsDelivered, setMealsDelivered] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [selectedImageName, setSelectedImageName] = useState<string | null>(null);
    const [postType, setPostType] = React.useState('');
    const [unit, setUnit] = React.useState('' as string);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [saveDisabled, setSaveDisabled] = useState(true);
    const [uploadButtonEnabled, setUploadButtonEnabled] = useState(false);
    const user: User | null = useSelector(selectUser());
    //Function to check if all the required fields are filled
    const areAllRequiredFieldsFilled = () => {
        return (
            title !== '' &&
            caption !== '' &&
            streetName !== '' &&
            area !== '' &&
            city !== '' &&
            pinCode !== '' &&
            state !== '' &&
            postType !== '' &&
            imageUrl !== null &&
            (postType !== 'FoodAvailabilityPost' || shelfLife !== '') &&
            (postType !== 'RawMaterialPost' || (shelfLife !== '' && quantity !== 0)) &&
            (postType !== 'NGOPromotionalPost' || mealsDelivered !== '')
        );
    };
    //useEffect to check if all the required fields are filled
    useEffect(() => {
        setSaveDisabled(!areAllRequiredFieldsFilled());
    }, [title, caption, streetName, area, city, pinCode, state, shelfLife, postType, quantity, mealsDelivered, imageUrl]);
    //Function to generate coordinates
    const handleGenerateCoordinates = () => {
        return new Promise((resolve, reject) => {
            console.log('Generating coordinates');
            const address = encodeURIComponent(`${area}, ${city}`);
            console.log('Address:', address);
            const apiKey = locationKeyConstant;
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
    //Function to handle the change in the post type
    const handleChange = (event: SelectChangeEvent) => {
        setPostType(event.target.value);
    };
    //Function to handle the change in the unit
    const handleChangeUnit = (event: SelectChangeEvent) => {
        setUnit(event.target.value);
    };
    //Function to handle the image change
    const handleImageChange = async () => {
        if (selectedImage) {
            console.log('firebaseStorage'+firebaseStorage)
            const imageRef = ref(firebaseStorage, `files/${v4()}`);
            await uploadBytes(imageRef, selectedImage);
            const url = await getDownloadURL(imageRef);
            console.log('Image URL'+url);
            setUploadButtonEnabled(false);
            setImageUrl(url);
        }
    };
    //useState for the allergens
    const [allergens, setAllergens] = useState(['']);
    //Function to handle the change in the allergens
    const handleAllergenChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newAllergens = [...allergens];
        newAllergens[index] = event.target.value;
        setAllergens(newAllergens);
    };
    //Function to add allergens
    const handleAddAllergen = () => {
        setAllergens([...allergens, '']);
    };
    //Function to remove allergens
    const handleRemoveAllergen = (index: number) => {
        const newAllergens = [...allergens];
        newAllergens.splice(index, 1);
        setAllergens(newAllergens);
    };
    return(
        //Return the JSX
        <React.Fragment>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    maxWidth="lg"
                    sx={{ 
                        width: '1000px', 
                        height:'750px', 
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
                                Share a Meal
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

                            <Box sx={{
                                display: 'flex', 
                                justifyContent: 'center', 
                                color: 'grey',
                                fontSize: '16px', 
                                margin: '-20px 0px 10px 0px', 
                                fontFamily: 'Open Sans, sans-serif'
                            }}>
                                Create a New Post
                            </Box>
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
                            <FormControl sx={{ marginTop:'20px', maxWidth: '440px' }}>
                                <InputLabel id="demo-simple-select-helper-label">Post Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={postType}
                                    label="Post Type"
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {user && (user.role === 'regularUser' || user.role === 'restaurent') && <MenuItem value={'FoodAvailabilityPost'}>Food Availability Post</MenuItem>}
                                    {user && user.role === 'ngo' && <MenuItem value={'NGOPromotionalPost'}>NGO Promotional Post</MenuItem>}
                                    {user && user.role === 'supplier' && <MenuItem value={'RawMaterialPost'}>Raw Material Post</MenuItem>}
                                    {!user && (
                                        <>
                                            <MenuItem value={'FoodAvailabilityPost'}>Food Availability Post</MenuItem>
                                            <MenuItem value={'RawMaterialPost'}>Raw Material Post</MenuItem>
                                            <MenuItem value={'NGOPromotionalPost'}>NGO Promotional Post</MenuItem>
                                        </>
                                    )}
                                </Select>
                            </FormControl>
                            {postType === 'FoodAvailabilityPost' && (
                                <>
                                    <TextField
                                        sx={{marginTop:'20px', width:'440px'}}
                                        id="outlined-required"
                                        label="Shef Life"
                                        placeholder="Shef Life"
                                        onChange={(event) => setShelfLife(event.target.value)}
                                        required
                                    />
                                    <FormControlLabel 
                                        control={<Checkbox defaultChecked onChange={(event) => setIsVeg(event.target.checked)} />} 
                                        label="isVeg" 
                                    />
                                    {allergens.map((allergen, index) => (
                                        <Box key={index}>
                                            <TextField
                                                sx={{marginTop:'20px', width:'440px'}}
                                                id={`allergen-${index}`}
                                                label="Allergen"
                                                value={allergen}
                                                onChange={(event: ChangeEvent<HTMLInputElement>) => handleAllergenChange(index, event)}
                                            />
                                            <Button onClick={() => handleRemoveAllergen(index)}>Remove</Button>
                                        </Box>
                                    ))}
                                    <Button onClick={handleAddAllergen}>Add more</Button>
                                </>
                            )}
                            {postType === 'RawMaterialPost' && (
                                <>
                                    <TextField
                                        sx={{marginTop:'20px', width:'440px'}}
                                        id="outlined-required"
                                        label="Shef Life"
                                        placeholder="Shef Life"
                                        onChange={(event) => setShelfLife(event.target.value)}
                                        required
                                    />
                                    <FormControl sx={{ marginTop:'20px', maxWidth: '440px' }}>
                                        <InputLabel id="demo-simple-select-helper-label">Unit</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={unit}
                                            label="Unit"
                                            onChange={handleChangeUnit}
                                            required
                                            >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={'kilogram'}>Kilograms(Kg)</MenuItem>
                                            <MenuItem value={'pound'}>Pound(lb)</MenuItem>
                                            <MenuItem value={'liter'}>Liter(L)</MenuItem>
                                            <MenuItem value={'galon'}>Gallon(gal)</MenuItem>
                                            <MenuItem value={'unit'}>Unit</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        sx={{marginTop:'20px', width:'440px'}}
                                        id="outlined-required"
                                        label="Quantity"
                                        placeholder="Quantity"
                                        onChange={(event) => setQuantity(parseInt(event.target.value))}
                                        required
                                    />
                                </>)}
                            {postType === 'NGOPromotionalPost' && (
                                <>
                                    <TextField
                                        sx={{marginTop:'20px', width:'440px'}}
                                        id="outlined-required"
                                        label="Meals Delivered"
                                        placeholder="Meals Delivered"
                                        onChange={(event) => setMealsDelivered(event.target.value)}
                                        required
                                    />
                                </>)}
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
                                    const postData = {
                                        id: v4(), 
                                        image: imageUrl,
                                        createdAt: new Date(),
                                        updatedAt: new Date(),
                                        author: (user?.firstName && user?.lastName) ? `${user.firstName} ${user.lastName}` : user?.name, 
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
                                        postType,
                                        mediaDetails: {
                                            shelfLife,
                                            isVeg,
                                            allergens,
                                            quantity,
                                            unit,
                                            mealsDelivered
                                        },
                                        isDeliveryDone: 0,
                                        isPickedUp: 0,
                                        userId: user?.id
                                    };
                                    console.log(postData);
                                    savePostData(postData);
                                    handleClose();
                                } catch (error) {
                                    console.error('Error:', error);
                                }
                            }}
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
export default NewPostComponent;
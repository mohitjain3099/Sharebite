import React, { useEffect } from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AddLocation } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Media from '../../models/Media';
import { apiServiceGetFilterEvent } from '../../services/api.service.getFilterEvent';
import { apiServiceGetEventData as getevent } from '../../services/api.service.getEventData';
import './../../dist/main.css';
import { format, set } from 'date-fns';
import { Button } from '@mui/material';
import RegisterEventComponent from './RegisterEventComponent';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user-slice';
import { User } from '../../models/User';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';
// Styles for ExpandMore Icon
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  // ExpandMore Icon
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
// EventComponentProps
interface EventComponentProps {
    searchKeyWord?: string; 
}
// EventComponent
function EventComponent( {searchKeyWord}: EventComponentProps) {
    // State variables
    const [eventData, setEventData] = useState([] as Media[]);
    const [expanded, setExpanded] = useState<boolean[]>([]);
    const [isExpanded, setIsExpanded] = useState<Record<string, boolean>>({});
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState([] as Media[]);
    const user: User | null = useSelector(selectUser());
    const navigate = useNavigate();
    // useEffect
    useEffect(() => {
        if(searchKeyWord !== undefined){
            if(searchKeyWord){
                apiServiceGetFilterEvent(searchKeyWord).then((data) => {
                    setEventData(data);
                    setExpanded(new Array(data.length).fill(false)); // Initialize expanded state array
                });
            }
            else{
                getevent().then((data) => {
                    setEventData(data);
                    setExpanded(new Array(data.length).fill(false)); // Initialize expanded state array
                });
            }
        }
    }, [searchKeyWord]);
    // handleExpandClickDescription
    const handleExpandClickDescription = (eventId: number) => {
        setIsExpanded(prevState => ({ ...prevState, [eventId]: !prevState[eventId] }));
    };
    // openGoogleMap
    const openGoogleMap = (lat:any, lng:any) => {
        const latlng = encodeURIComponent(`${lat}, ${lng}`);
        const url = `https://www.google.com/maps/search/?api=1&query=${latlng}`;
        window.open(url);
    }
    // handleExpandClick
    const handleExpandClick = (index: number) => {
        setExpanded(prevExpanded => {
          const newExpanded = [...prevExpanded];
          newExpanded[index] = !newExpanded[index];
          return newExpanded;
        });
      };
    // handleClickOpen
    const handleClickOpen = (event: any) => {
        setOpen(true);
        setSelectedEvent(event);
    }
    // useEffect
    useEffect(() => {
    if(!user){
        Swal.fire({
            title: "Event registration is just a click away!",
            text: "Log in to secure your spot.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Login"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/login');
            }
        });
    }
    }, []);
    // handleClose
    const handleClose = () => {
        setOpen(false);
    };
    return(
        <>
            <Grid container spacing={2}>
                {eventData.map((event,index) => (
                    <Grid item xs={12} sm={6} md={6}>
                    <Card sx={{ width: '600px', margin: 'auto', borderRadius:'10px'}}>
                        <CardMedia
                            component="img"
                            height="350px"
                            image={event.image}
                            alt="Post image"
                        />
                        <CardContent sx={{paddingBottom:'0px', paddingRight:'10px', marginRight:"10px",marginLeft:"10px"}}>
                            <Typography sx={{fontSize:'20px', fontWeight:'bold', color:"#FD514E"}} variant="body2" color="text.secondary">
                                {event.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography
                                    sx={{
                                        fontSize:'16px', 
                                        marginTop:'10px', 
                                        overflow: isExpanded[event.id] ? 'visible' : 'hidden', 
                                        textOverflow: 'ellipsis', 
                                        display: '-webkit-box', 
                                        WebkitLineClamp: isExpanded[event.id] ? 'none' : 3, 
                                        WebkitBoxOrient: 'vertical'
                                    }} 
                                    variant="body2" 
                                    color="text.secondary"
                                >
                                    {event.caption}
                                </Typography>
                                {event.caption.length > 100 && (
                                    <IconButton sx={{color:"#FD514E"}} onClick={() => handleExpandClickDescription(event.id)} aria-label="show more">
                                        <ExpandMoreIcon />
                                    </IconButton>
                                )}
                            </Box>
                            <Typography sx={{fontSize:'16px', marginTop:'10px'}} variant="body2" color="text.secondary">
                                <IconButton aria-label="add location" sx={{padding: '0px',color:"#FD514E"}}
                                                        onClick={() => {
                                                            const coordinates = typeof event.location.coordinates === 'string' 
                                                                ? JSON.parse(event.location.coordinates) 
                                                                : event.location.coordinates;
                                                            openGoogleMap(coordinates.lat, coordinates.lng);
                                                        }}>
                                    <AddLocation />
                                </IconButton>
                                {event.location.city}, {event.location.state}
                            </Typography>
                        </CardContent>
                        <CardContent sx={{paddingTop:'0px', paddingBottom:'0px', display:'flex', justifyContent:'space-between', marginRight:"10px",marginLeft:"10px"}}>
                            <Typography sx={{fontSize:'16px', marginTop:'10px', color:"#FD514E"}} variant="body2" color="text.secondary">
                                {format(new Date(event.updatedAt), 'yyyy-MM-dd HH:mm')}
                            </Typography>
                            <Button
                                disabled={!user}
                                component="button"
                                sx={{
                                    backgroundColor:'black',
                                    borderRadius: '20px',
                                    marginBottom: '0px',
                                    '&:hover': {
                                        backgroundColor: '#FD514E',
                                    }
                                }}
                                variant="contained"
                                color="primary"
                                onClick={() => handleClickOpen(event)}
                            >
                                Register
                            </Button>
                            <Typography sx={{fontSize:'16px', marginTop:'10px', color:"#FD514E"}} variant="body2" color="text.secondary">
                                {event.author}
                            </Typography>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
                <RegisterEventComponent open={open} handleClose={handleClose} eventData={selectedEvent}/>
                </Grid>
        </>
    );
}
export default EventComponent;
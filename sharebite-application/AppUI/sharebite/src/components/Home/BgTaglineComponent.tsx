import { Box, Button, Typography } from "@mui/material"
import BgImage from '../../static/images/BgImage.webp';
import { useState, useEffect } from "react";
import '../../dist/navbar.css';
import logoImage from '../../static/images/SharebiteLogo.png';
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const bgTaglineComponent = () => {
  // Text animation
  const fullText = 'A  Shared Bite, A Shared Future';
  const [text, setText] = useState('');
  // Text animation
  useEffect(() => {
    let i = 0;
    let currentText = '';
  
    const typeText = async () => {
      while (i < fullText.length) {
        currentText += fullText[i];
        setText(currentText);
        i++;
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    };
  
    typeText();
  
  }, []);

    return (
      // Background image with tagline
        <>
        
        <Box
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BgImage})`,
            backgroundSize: 'cover',
            height: '80vh',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'left',
            alignItems: 'center',
            marginBottom: '50px',
            marginTop: '75px'
          }}
        >
        <Box sx={{alignSelf:'flex-start',paddingTop:'40px', paddingLeft:'40px',marginRight:'135px'}}>
          <img src={logoImage} alt="Company Logo" height={'120px'} width={'160px'}/>
        </Box>
        <Box sx={{display:"flex", flexDirection:'column', width:'800px', alignItems:'center'}}>
        <Typography variant="h2" sx={{ color: '#fff', textAlign: 'center', }} className="tagline">
            {text}
          </Typography>
          <Typography variant="body1" sx={{ color: '#fff', textAlign: 'center', marginTop: '3em', width:'550px', fontSize: '18px' }} className="bg-content">
          At Sharebite, we're on a mission to combat hunger and food waste. We rescue excess food from restaurants and events and redistribute it to those in need. Join us in making a difference, one meal at a time.
          </Typography>
          <Button variant="outlined" sx={{ color: '#fff', borderColor: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.1)', marginTop: '3em' }} className="bg-button">
          <MuiLink component={RouterLink} to="/aboutUs" sx={{ textDecoration: 'none', color: 'inherit' }}>
            Know More
          </MuiLink>
          </Button>
        </Box>
          
        </Box>
        </>
    )
}

export default bgTaglineComponent;
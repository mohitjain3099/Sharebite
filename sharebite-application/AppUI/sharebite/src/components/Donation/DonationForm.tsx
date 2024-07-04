import { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Stack, Checkbox, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Box } from '@mui/material';
import { NewCertificate } from '../../services/PostCertificateService.ts';
import CreateCertificate from './CreateCertificate.ts';
import Donate from '../../static/images/Donate.png';
import '../../dist/navbar.css';
import Thankyou from '../../static/images/Thankyou.jpeg';
import WebFont from 'webfontloader';
import { User } from '../../models/User.tsx';
import { selectUser } from '../../store/user-slice.ts';
import { useSelector } from 'react-redux';

// Load the Google Fonts
WebFont.load({
  google: {
  families: ["Dancing Script", "cursive", "Open Sans", "sans-serif"]
  }
});
// DonationForm component
const DonationForm = () => {
  // State variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openThankYouDialog, setOpenThankYouDialog] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const user: User | null = useSelector(selectUser());
  // Handle form submission
  const handleSubmit = (e:any) => {
    e.preventDefault();
    const pattern = /^\$?\d+(\.\d{1,2})?(\/month)?$/;

    // Validate the input value against the pattern
    if (!pattern.test(amount)) {
    alert('Please enter a valid amount.');
    return;
    
    }
    setOpenPaymentDialog(true);

  }
  // Handle payment
  const handlePayment = async () => {
    // Close the payment dialog
    const expiryMonth = Number(expiryDate.split('/')[0]);
    const expiryYear = Number(`20${expiryDate.split('/')[1]}`);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const cardNumberDigits = cardNumber.replace(/ /g, '');
    // Validate the card details
    if (cardNumberDigits.length !== 16 || !/^\d+$/.test(cardNumberDigits)) {
      alert('Invalid card number');
      return;
    }

    if (expiryMonth>12 || expiryMonth<1) {
      alert('Invalid expiry date');
      return;
    }


    if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
      alert('Card is expired');
      return;
    }

    if (cvv.length !== 3) {
      alert('Invalid CVV');
      return;
    }
    // Close the payment dialog
    setOpenPaymentDialog(false);
    const amountNumber = Number(amount.replace(/[^0-9.]/g, ''));
    console.log(Number(amount));
    if (user) {
      await NewCertificate(name, Number(amountNumber), user.id);
    }
  
    // Open the thank you dialog
    setOpenThankYouDialog(true);
  }
  // Handle download
  const handleDownload = async () => {
    CreateCertificate({name, amount: Number(amount.replace(/[^0-9.]/g, ''))})
    setOpenThankYouDialog(false);
  }
  // One-time donations and monthly subscriptions
  const oneTimeDonations = [10, 20, 50, 100, 500];
  const monthlySubscriptions = [10, 20, 50, 100, 500];

  const handleOneTimeDonation = (amount: any) => {
    // Handle one-time donation logic here
    console.log(`One-time donation: $${amount}`);
    setAmount(`$${amount}`);
  };

  const handleMonthlySubscription = (amount: any) => {
    // Handle monthly subscription logic here
    console.log(`Monthly subscription: $${amount}/month`);
    setAmount(`$${amount}/month`);

  };
  // Render the donation form
  return (
    <>
    <Box sx={{ml:-18, p:0, position:'absolute', backgroundImage: `url(${Donate})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', width:'100vw'}}>
    <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', width: '625px', height: '600px', marginTop:'90px', marginLeft:'700px', borderRadius:'20px'}}>
        <CardContent sx={{mx:3}} >
          <Typography variant="h4" sx={{mb:2, fontFamily: ["Dancing Script", "cursive", "Open Sans", "sans-serif"].join(','), color:'#FD514E', textAlign:'center'}}>Support Our Cause</Typography>
          <Stack direction="column" spacing={2}>
          <Typography>Your donation helps us make a difference in the lives of those in need. Thank you for your generosity!</Typography>
          <Typography variant="h5" gutterBottom>One-time Donation</Typography>
          <Stack direction="row" spacing={3}>
            {oneTimeDonations.map((amount) => (
              <Button variant="outlined"  key={amount} onClick={() => handleOneTimeDonation(amount)} sx={{borderColor:'#FD514E', color:'#FD514E'}}>
                ${amount}
              </Button>
            ))}
          </Stack>
          <Typography variant="h5" gutterBottom>Monthly Subscription</Typography>
          <Stack direction="row" spacing={2}>
            {monthlySubscriptions.map((amount) => (
              <Button variant="outlined" color="primary" key={amount} onClick={() => handleMonthlySubscription(amount)} sx={{borderColor:'#FD514E', color:'#FD514E'}}>
                ${amount}/month
              </Button>
            ))}
          </Stack>
          <Typography variant="h5" gutterBottom>Donation Form</Typography>
          <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required InputProps={{sx: { borderColor: '#FD514E' }}} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Amount" value={amount} onChange={(e) =>{

                // Add a dollar sign before the amount if it's not already there
                const newValue = e.target.value.startsWith('$') ? e.target.value : `$${e.target.value}`;

                setAmount(newValue);
              }} fullWidth required InputProps={{sx: { borderColor: '#FD514E' }}}/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth type='email' required InputProps={{sx: { borderColor: '#FD514E' }}} />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Select Payment Method</InputLabel>
                <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} label= 'Select Payment Method'>
                  <MenuItem value="credit_card">Credit Card</MenuItem>
                  <MenuItem value="debit_card">Debit card</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} container justifyContent={'center'}>
              <Button variant="contained" type="submit" className='btn-contribute'>
                Contribute
              </Button>
            </Grid>
          </Grid>
          </form>
        </Stack>
        </CardContent>
      </Card>
      <Dialog open={openPaymentDialog} onClose={() => setOpenPaymentDialog(false)} fullWidth>
          
          <DialogTitle sx={{color:'#FD514E', alignSelf:'center'}}>Enter your card details</DialogTitle>
          <DialogContent >
          <Stack spacing={2} sx={{paddingTop:'20px'}}>
          <TextField 
            label="Card Number" 
            fullWidth 
            required 
            value={cardNumber} 
            onChange={e => setCardNumber(e.target.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim())} 
            inputProps={{ maxLength: 19, shrink: true }} // 16 digits + 3 spaces
          />

          <TextField 
            label="Expiry Date" 
            fullWidth 
            required 
            value={expiryDate} 
            onChange={e => setExpiryDate(e.target.value.replace(/\D/g, '').replace(/(.{2})/, '$1/').trim())} 
            inputProps={{ maxLength: 5 }} // MM/DD
          />

          <TextField 
            label="CVV" 
            fullWidth 
            required 
            value={cvv} 
            onChange={e => setCvv(e.target.value.replace(/\D/g, ''))} 
            inputProps={{ maxLength: 3 }}
          />
                    </Stack>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handlePayment} sx={{color:'#FD514E'}}>Make Payment</Button>
                    </DialogActions>
        
          </Dialog>

        <Dialog open={openThankYouDialog} onClose={() => setOpenThankYouDialog(false)} sx={{ display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <Box sx={{ display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <DialogTitle>Thank you for your contribution!</DialogTitle>
          <DialogContent>
            <img src={Thankyou} alt="Thank You" width="100%" height="100%" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDownload} sx={{color:'#FD514E'}}>Download Certificate</Button>
            <Button onClick={() => setOpenThankYouDialog(false)} sx={{color:'#FD514E'}}>Close</Button>
          </DialogActions>
        </Box>
        </Dialog>
    </Box>
    </>
  );
}

export default DonationForm;
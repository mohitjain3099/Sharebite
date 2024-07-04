import { List, ListItem, Button, Grid, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCertificate } from '../../services/getCertificateService';
import { User } from '../../models/User';
import { selectUser } from '../../store/user-slice';
import { Donation } from '../../interfaces/Donation';
import CreateCertificate from './CreateCertificate';

// DonationPageForProfile component
const DonationPageForProfile = () => {
    // State variables
  const [donations, setDonations] = useState([]);
  const user: User | null = useSelector(selectUser());
  // Fetch the donations for the user
  useEffect(() => {
    if (user) {
      getCertificate(user.id).then(setDonations);
    }
  }, [user]);
  // Handle download
  const handleDownload = (donation: Donation) => {
    CreateCertificate({name: donation.name, amount: Number(donation.amount)})
    
  };
  // Return the JSX for the component
  return (
    <Box display="flex" justifyContent="center" mt={5}>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center'><strong>Name</strong></TableCell>
            <TableCell align="center"><strong>Donation Date</strong></TableCell>
            <TableCell align="center"><strong>Donation Amount</strong></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {donations.map((donation: Donation) => (
            <TableRow key={donation.userId}>
              <TableCell component="th" scope="row" align='center'>{donation.name}</TableCell>
              <TableCell align="center">{new Date(donation.date).toLocaleDateString()}</TableCell>
              <TableCell align="center">{donation.amount}</TableCell>
              <TableCell align="center" sx={{width:'200px'}}>
                <Button variant="contained"onClick={() => handleDownload(donation)} sx={{backgroundColor:'black'}}>
                  Download Certificate
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default DonationPageForProfile;
import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import HungerHero from '../../static/images/HungerHero.png';
import NGO from '../../static/images/NGO.png';
import Partner from '../../static/images/Partner.png';
import '../../dist/navbar.css';

// Contribution options
const contributionOptions = [
  { title: 'Be a Hunger Hero', buttonText: 'Join the Team', icon: HungerHero, content: 'Join us in the fight against hunger by becoming a vital part of our team. Whether you\'re a passionate chef, a dedicated helper, or a reliable delivery person, your support ensures that surplus food reaches those who need it most. You can also make a difference by donating funds to sustain our mission.' },
  { title: 'Partner with Purpose', buttonText: 'Become a Partner', icon: Partner ,content: 'Are you a food chain or restaurant looking to make a meaningful impact? Partner with us to post surplus food availability and help us rescue perfectly good food from going to waste. Additionally, your donation of raw materials can fuel our efforts during special events.'},
  { title: 'Unite for Change', buttonText: 'Join the Movement', icon: NGO, content: 'Join forces with us as an NGO dedicated to ending hunger and food waste. Together, we can amplify our impact and ensure that no edible food goes to waste. Let\'s work hand in hand to create a hunger-free world for all.' },
];
// ContributeComponent
export const ContributeComponent = () => {
    return(
        <Box sx={{ padding: '2em 4em', marginBottom: '50px'}}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '50px', marginTop: '30px'}}>
          How You Can Contribute?
        </Typography>
        <Grid container spacing={10}>
          {contributionOptions.map((option) => (
            <Grid item xs={12} sm={4} key={option.title}>
              <Card sx={{ backgroundColor: '#fff', color: '#000', height:'450px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding:'10px'}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
                  <img src={option.icon} alt={option.title} width={130} height={130}/>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', marginTop: '1em' }}>
                    {option.title}
                  </Typography>
                  <Typography variant="body1" sx={{ marginTop: '1em', flexGrow:1, textAlign: 'center'}}>
                    {option.content}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1em' }}>
                  <Button variant="contained" className='btn-contribute'>
                    {option.buttonText}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    )
          }

export default ContributeComponent;
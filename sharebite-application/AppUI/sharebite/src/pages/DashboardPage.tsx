import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import PostPageForProfile from './PostPageForProfile';
import DonationPageForProfile from '../components/Donation/DonationPageForProfile.tsx';

// Dashboard component
const Dashboard = () => {
  // State variables
  const [value, setValue] = useState(0);
  // Handle change
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // Return the JSX for the component
  return (
    <div>
      <Tabs value={value} onChange={handleChange} sx={{mb:5}}>
        <Tab label="Posts" />
        <Tab label="Donations" />
      </Tabs>
      {value === 0 && <PostPageForProfile />}
      {value === 1 && <DonationPageForProfile />}
    </div>
  );
}

export default Dashboard;
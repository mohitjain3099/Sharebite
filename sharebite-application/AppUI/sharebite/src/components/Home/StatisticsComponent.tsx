import { useState, useEffect } from "react";
import { Typography, Box, Card, CardContent, Grid } from "@mui/material";

import Meals from "../../static/images/Meals.jpeg";
import NGOs from "../../static/images/NGOsAssociated.jpeg";
import Volunteers from "../../static/images/Volunteers.jpeg";
import { useSelector } from "react-redux";
import { User } from "../../models/User";
import { selectUser } from "../../store/user-slice";
import { getUserCountByRole } from "../../services/api.service.users";
import Constants from "../../AppConstants";
// Define the StatisticsComponent
export const StatisticsComponent = () => {
  const [mealsDelivered, setMealsDelivered] = useState(0);
  const [ngosAssociated, setNgosAssociated] = useState(20);
  const [volunteersEngaged, setVolunteersEngaged] = useState(45);
  const user: User | null = useSelector(selectUser());

  // Fetch data from the API when the component mounts
  useEffect(() => {
    // Fetch data from your database here and update the state variables.
    // This is just a placeholder, replace it with your actual data fetching code.
    getUserCountByRole("ngo")
      .then((response) => response.json())
      .then((data) => setNgosAssociated(data.ngo +30));
    let userCount = 0;
    getUserCountByRole("delivery")
      .then((response) => response.json())
      .then((data) => { setVolunteersEngaged(data.delivery); userCount = data.delivery; });

    getUserCountByRole("helper")
      .then((response) => response.json())
      .then((data) => setVolunteersEngaged(userCount + data.helper +95));

    setVolunteersEngaged(userCount);

    fetch(`${Constants.API_URL}/graphicalDatas`)
      .then((response) => response.json())
      .then((data) => {
        const totalMealsDelivered = data.reduce(
          (total: number, yearData: { MealsDelivered: number }) =>
            total + yearData.MealsDelivered,
          0
        );
 
        setMealsDelivered(totalMealsDelivered);
      })
      .catch((error) => console.error(error));
  }, []);
// Return the JSX for the component
  return (
    <Box sx={{ padding: "2em 4em", marginBottom: "50px" }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", textAlign: "center", marginBottom: "2em" }}
      >
        By the Numbers
      </Typography>
      <Grid container spacing={10}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <img
                src={Meals}
                alt="Meals Delivered"
                height={100}
                style={{ borderRadius: "50px" }}
              />
              <Typography variant="h5">Meals Delivered</Typography>
              <Typography variant="h4">{mealsDelivered}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <img
                src={NGOs}
                alt="NGOs Associated"
                height={100}
                style={{ borderRadius: "50px" }}
              />
              <Typography variant="h5">NGOs Associated</Typography>
              <Typography variant="h4">{ngosAssociated}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <img
                src={Volunteers}
                alt="Volunteers Engaged"
                height={100}
                style={{ borderRadius: "50px" }}
              />
              <Typography variant="h5">Volunteers Engaged</Typography>
              <Typography variant="h4">{volunteersEngaged}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticsComponent;

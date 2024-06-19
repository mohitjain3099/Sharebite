import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";
import AboutUsImage from "../static/images/AboutUsCover.jpeg";
import NavbarComponent from "../components/Navbar/NavbarComponent";
import CollectionImage from "../static/images/Collection.jpeg";
import RedistributionImage from "../static/images/Distribution.jpeg";
import ImpactImage from "../static/images/Impact.png";
import Footer from "../components/Home/Footer";
import Amit from "../static/images/Amit.jpeg";
import Aniket from "../static/images/Aniket.jpeg";
import Mohit from "../static/images/Mohit.jpeg";
import Shreyas from "../static/images/Shreyash.jpeg";

// AboutPage
const AboutPage = () => {
  //   return (
  //     <>
  //     <NavbarComponent/>
  //     <Box mt ={9} mb={6} textAlign="center">
  //       <Card sx={{ margin: 'auto', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
  //           <CardMedia component="img" src={AboutUsImage} alt="Cover Photo" style={{ width: '100%', height: '50vh' }}/>
  //         </Card>
  //       </Box>
  //     <Container>
  //       <Typography variant="h2" align="center" gutterBottom>About Sharebite</Typography>
  //       <Grid container justifyContent="center">
  //         <Grid item xs={12} md={8}>
  //           <Paper elevation={3} sx={{ padding: '16px', marginBottom: '24px' }}>
  //             <Typography variant="body1" align="center" paragraph>
  //               Welcome to Sharebite! We are on a mission to end world hunger and achieve zero food wastage.
  //               At Sharebite, we believe that every person deserves access to nutritious food, and we are committed to making this vision a reality.
  //             </Typography>
  //             <Typography variant="body1" align="center" paragraph>
  //               Our mission at Sharebite is simple yet profound: to end world hunger by ensuring that no food goes to waste.
  //               We are driven by the belief that abundance should be shared, not wasted. Through our innovative approach,
  //               we strive to create a world where hunger is eradicated, and every individual has access to nourishing meals.
  //             </Typography>
  //             <Typography variant="body1" align="center" paragraph>
  //               Sharebite is actively involved in rescuing surplus food from various sources, including restaurants, events, and households.
  //               Our dedicated team of volunteers collects leftover food and ensures that it is delivered promptly to people in need.
  //               We work closely with partner NGOs to distribute the food to vulnerable communities, including homeless shelters, orphanages, and refugee camps.
  //             </Typography>
  //           </Paper>
  //         </Grid>
  //       </Grid>
  //       {/* Add more sections as needed */}
  //     </Container></>

  //   );
  return (
    <>
      <NavbarComponent />
      <Box mt={9} mb={6} textAlign="center">
        <Card
          sx={{
            margin: "auto",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardMedia
            component="img"
            src={AboutUsImage}
            alt="Cover Photo"
            style={{ width: "100%", height: "50vh" }}
          />
        </Card>
      </Box>
      <Container>
        <Typography id="about" variant="h2" align="justify" gutterBottom>
          About Sharebite
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          paragraph
          sx={{ fontSize: "18px" }}
        >
          Sharebite is a non-profit organization dedicated to alleviating hunger
          and reducing food waste in our communities. According to the United
          Nations, over 690 million people worldwide suffer from hunger, while
          approximately one-third of all food produced globally is wasted. At
          Sharebite, we believe in turning surplus into sustenance, addressing
          both food scarcity and food waste simultaneously.
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          paragraph
          sx={{ fontSize: "18px" }}
        >
          Through partnerships with restaurants, businesses, and food
          distribution NGOs, we rescue surplus food that would otherwise go to
          waste. By redistributing this food to those in need, we not only
          provide nourishment to the hungry but also contribute to environmental
          sustainability by reducing the carbon footprint associated with food
          waste.
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          paragraph
          sx={{ fontSize: "18px" }}
        >
          Every meal shared through Sharebite is a step towards a world where no
          one goes hungry and where resources are utilized responsibly. Join us
          in our mission to make a meaningful impact on hunger and food waste in
          our communities.
        </Typography>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mt: 8, mb: 6 }}
          id="how-it-works"
        >
          How It Works
        </Typography>
        <Grid container spacing={3} mb={8}>
          <Grid item xs={12} sm={4}>
            <Card>
              <Box display="flex" justifyContent="center" mt={2}>
                <Avatar
                  src={CollectionImage}
                  alt="Collection"
                  sx={{ width: 200, height: 200, alignSelf: "center", mb: 3 }}
                />
              </Box>
              <CardContent>
                <Typography variant="h5" align="center" mb={1}>
                  Collection
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  sx={{ fontSize: "18px" }}
                >
                  We collect surplus food from restaurants, events, and
                  businesses.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <Box display="flex" justifyContent="center" mt={2}>
                <Avatar
                  src={RedistributionImage}
                  alt="Redistribution"
                  sx={{ width: 200, height: 200, mb: 3 }}
                />
              </Box>
              <CardContent>
                <Typography variant="h5" align="center" mb={1}>
                  Redistribution
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  sx={{ fontSize: "18px" }}
                >
                  We distribute the collected food to food distribution NGOs and
                  shelters.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <Box display="flex" justifyContent="center" mt={2}>
                <Avatar
                  src={ImpactImage}
                  alt="Impact"
                  sx={{ width: 200, height: 200, mb: 3 }}
                />
              </Box>
              <CardContent>
                <Typography variant="h5" align="center" mb={1}>
                  Impact
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  sx={{ fontSize: "18px" }}
                >
                  Together, we make a difference in the lives of those facing
                  hunger.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h3" align="center" id="our-mission" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" align="justify" paragraph fontSize={18}>
          At Sharebite, our mission is simple yet profound: to alleviate hunger
          and reduce food waste in our communities. We believe that access to
          nutritious food is a fundamental human right, and no one should have
          to go to bed hungry. Likewise, we recognize the environmental and
          ethical imperative to minimize food waste and ensure that surplus food
          is redistributed to those in need rather than ending up in landfills.
        </Typography>
        <Typography variant="body1" align="justify" paragraph fontSize={18}>
          Our mission drives everything we do. From partnering with local
          restaurants, businesses, and food distribution NGOs to rescuing
          surplus food, to distributing meals to individuals and families facing
          hunger, we are committed to making a tangible impact on the lives of
          those in need.
        </Typography>
        <Typography variant="body1" align="justify" paragraph fontSize={18}>
          By providing nourishment to the hungry and reducing food waste, we not
          only address immediate food insecurity but also contribute to broader
          social and environmental goals. Together with our dedicated team,
          volunteers, donors, and partners, we are working towards a future
          where no one goes hungry, and where surplus food is shared to sustain
          lives and communities.
        </Typography>
        <Typography variant="body1" align="justify" paragraph fontSize={18}>
          Join us in our mission to create a world where everyone has access to
          nutritious food, and where resources are utilized responsibly for the
          benefit of all.
        </Typography>
      </Container>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        mb={8}
        id="meet-our-team"
      >
        Meet Our Team
      </Typography>
      <Grid container spacing={1} justifyContent="center" mx={5}>
        <Grid item xs={12} sm={6} md={3} mb={8}>
          <Card sx={{ maxWidth: 260, boxShadow: "none" }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={2}
            >
              <Avatar
                src={Amit}
                alt="Member 1"
                sx={{ width: 150, height: 150, mb: 3 }}
              />
              <Typography variant="h5" align="center" mb={1}>
                Amit Singh Tomar
              </Typography>
              <Typography variant="body1" align="center">
                Operations Manager
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ maxWidth: 260, boxShadow: "none" }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={2}
            >
              <Avatar
                src={Aniket}
                alt="Member 2"
                sx={{ width: 150, height: 150, mb: 3 }}
              />
              <Typography variant="h5" align="center" mb={1}>
                Aniket Navale
              </Typography>
              <Typography variant="body1" align="center">
                Volunteer Coordinator
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ maxWidth: 260, boxShadow: "none" }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={2}
            >
              <Avatar
                src={Mohit}
                alt="Member 3"
                sx={{ width: 150, height: 150, mb: 3 }}
              />
              <Typography variant="h5" align="center" mb={1}>
                Mohit Jain
              </Typography>
              <Typography variant="body1" align="center">
                Finance Manager
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ maxWidth: 260, boxShadow: "none" }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={2}
            >
              <Avatar
                src={Shreyas}
                alt="Member 4"
                sx={{ width: 150, height: 150, mb: 3 }}
              />
              <Typography variant="h5" align="center" mb={1}>
                Shreyas Kothari
              </Typography>
              <Typography variant="body1" align="center">
                Partnerships Manager
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default AboutPage;

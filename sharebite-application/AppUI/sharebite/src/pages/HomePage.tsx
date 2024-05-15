import BgTaglineComponent from "../components/Home/BgTaglineComponent";
import ContributeComponent from "../components/Home/ContributeComponent";
import NavbarComponent from "../components/Navbar/NavbarComponent";
import StatisticsComponent from "../components/Home/StatisticsComponent";
import React from "react";
import Quiz from "../components/Home/Quiz";
import CardPosts from "../components/Home/CardPosts";
import GraphicalData from "../components/Home/GraphicalData";
import Footer from "../components/Home/Footer";
import { Box } from "@mui/material";


// HomePage component

const HomePage = () => {
    return (
        <Box sx={{ position: 'relative' }}>
            <NavbarComponent />
            <BgTaglineComponent />
            <Quiz />
            <CardPosts />
            <GraphicalData />
            <StatisticsComponent />
            <Footer />
        </Box>
    )
}

export default HomePage;
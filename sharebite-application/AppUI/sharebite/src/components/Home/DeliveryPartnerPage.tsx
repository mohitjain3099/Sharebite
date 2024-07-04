import React from "react";
import "../../../css/CardPosts.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DeliveryCardPosts from "./DeliveryCardPosts"; // Import DeliveryCardPosts

// Define the DeliveryPartnerPage component
const DeliveryPartnerPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <DeliveryCardPosts />
      <Footer />
    </div>
  );
};

export default DeliveryPartnerPage;

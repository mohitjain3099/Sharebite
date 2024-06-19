import { Container } from "@mui/material";
import DonationForm from "../components/Donation/DonationForm";
import NavbarComponent from "../components/Navbar/NavbarComponent";

// Donate page component
const DonatePage = () => {

  return (
    <Container>
      <NavbarComponent />
      <DonationForm />
    </Container>
  );
}

export default DonatePage;
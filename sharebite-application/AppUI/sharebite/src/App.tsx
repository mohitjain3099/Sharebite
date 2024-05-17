import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import PostPage from "./pages/PostPage";
import HomePage from "./pages/HomePage";
import DonatePage from "./pages/DonatePage";
import ProfilePage from "./pages/ProfilePage";
import EventPage from "./pages/EventPage";
import { Route, Routes } from "react-router-dom";
import ChangePassword from "./components/Profile/ChangePassword";
import DashboardPage from "./pages/DashboardPage";
import AboutUsPage from "./pages/AboutUsPage";
import LoginPage from "./pages/LoginPage";
import RenderProfile from "./components/Profile/RenderProfile";

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Posts" element={<PostPage />} />
        <Route path="/Donate" element={<DonatePage />} />
        <Route path="/Profile/*" element={<ProfilePage />}>
          <Route path="PersonDetails" element={<RenderProfile />} />
          <Route path="Dashboard" element={<DashboardPage />} />
          <Route path="ChangePassword" element={<ChangePassword />} />
        </Route>
        <Route path="/Events" element={<EventPage />} />
        <Route path="/AboutUs" element={<AboutUsPage />} />
      </Routes>
    </>
  );
}

export default App;

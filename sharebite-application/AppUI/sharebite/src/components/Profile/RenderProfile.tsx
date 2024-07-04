import { Box, Typography } from "@mui/material";
import { Route } from "react-router-dom";
import ProfilePage from "../../pages/ProfilePage";
import PersonDetailsComponent from "./PersonDetailsComponent";
import PostPageForProfile from "../../pages/PostPageForProfile";
import ChangePassword from "./ChangePassword";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user-slice";
import PartnerDetailsComponent from "./PartnerDetailsComponent";
import { User } from "../../models/User";
import Constants from "../../AppConstants";
export default function RenderProfile() {

    const user: User = useSelector(selectUser());

    return (
        <>
            {user.type === Constants.INDIVIDUAL_USER ? (
                <PersonDetailsComponent />
            ) : (
                <PartnerDetailsComponent />
            )}
        </>
    )
} 
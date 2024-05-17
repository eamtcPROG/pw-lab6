import React, { useContext } from "react";

import { IconButton } from "@mui/material";
import { AuthContext } from "providers/AuthProvider";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
const LogoutButton:React.FC = () => {

    const { user, logout } = useContext(AuthContext);
    if(!user) return null;
    return (
        <IconButton onClick={logout}>
            <ExitToAppIcon color="error"/>
        </IconButton>
    )
}

export { LogoutButton}
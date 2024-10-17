import * as React from "react";
import { useNavigate } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LanguageIcon from "@mui/icons-material/Language";
import PersonIcon from "@mui/icons-material/Person";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import { useSendLogoutMutation } from "./authApiSlice";
import { PulseLoader } from "react-spinners";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const drawerItems = [
  {
    text: "Home",
    icon: <HomeIcon />,
    path: "/dash",
  },
  {
    text: "Overview",
    icon: <LanguageIcon />,
    path: "/dash/overview",
  },
  {
    text: "Contact",
    icon: <LocalPhoneIcon />,
    path: "/dash/contact",
  },
];

const adminItems = [
  {
    text: "Add new User",
    icon: <PersonIcon />,
    path: "/dash/users/new",
  },
];

export default function TemporaryDrawer() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  // Handling Logout
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  React.useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const logoutButton = (
    <ListItemButton onClick={sendLogout}>
      <ListItemIcon>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </ListItemIcon>
      <ListItemText primary="Sign Out" />
    </ListItemButton>
  );

  let buttonContent;
  if (isLoading) {
    buttonContent = (
      <ListItem disablePadding>
        <PulseLoader color={"#FFF"} />
      </ListItem>
    );
  } else {
    buttonContent = <ListItem disablePadding>{logoutButton}</ListItem>;
  }

  return (
    <React.Fragment>
      {/* Render common items for all users */}
      {drawerItems.map((item, index) => (
        <ListItem key={item.text + index} disablePadding>
          <ListItemButton onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}

      {/* Conditionally render admin-only items */}
      {isAdmin &&
        adminItems.map((item, index) => (
          <ListItem key={item.text + index} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}

      {/* Render the logout button */}
      {buttonContent}

      {/* Show error if logout fails */}
      {isError && <p className="errmsg">{error?.data?.message}</p>}
    </React.Fragment>
  );
}

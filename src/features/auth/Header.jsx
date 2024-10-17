import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Navigation from "./navigation";
import { Avatar, Toolbar, IconButton, Typography, Dialog } from "@mui/material"; // Added missing imports
import { useState } from "react";
import Logo from "../../../public/no.png";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import { List } from "@mui/material";
import { Divider } from "@mui/material";
import UserProfile from "./UserProfile";

const Header = () => {
  const drawerWidth = 240;

  const [open, setOpen] = useState(false); // State for Drawer
  const [openProfile, setOpenProfile] = useState(false); // State for UserProfile modal

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOpenProfile = () => {
    setOpenProfile(true); // Open the modal when icon button is clicked
  };

  const handleCloseProfile = () => {
    setOpenProfile(false); // Close the modal
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    boxShadow: theme.shadows[2], // Add a shadow for depth
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      backgroundColor: theme.palette.background.default,
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  return (
    <>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px",
            background: "linear-gradient(to right, #00d9e1, #01579b)",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{
              flexGrow: 1,
              fontWeight: "bold", // Make the title bold
              fontSize: "1.5rem", // Adjust font size
            }}
          >
            LedgerLearn
          </Typography>
          {/* IconButton to open the UserProfile modal */}
          <IconButton onClick={handleOpenProfile} color="inherit">
            <Avatar alt="Remy Sharp" src={Logo} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <Navigation />
        </List>
      </Drawer>

      {/* UserProfile Modal */}
      <Dialog open={openProfile} onClose={handleCloseProfile}>
        {/* Pass the open and handleClose props to UserProfile */}
        <UserProfile open={openProfile} handleClose={handleCloseProfile} />
      </Dialog>
    </>
  );
};
export default Header;

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  CssBaseline,
  Toolbar,
  Typography,
  Box,
  Container,
} from "@mui/material"; // Added missing imports
import Courses from "./courseMaterial";
import Logo from "../../../public/no.png";
import UsersList from "../users/UsersList";
import { styled } from "@mui/material/styles";
import useAuth from "../../hooks/useAuth";
import Header from "./header";

const Welcome = () => {
  const { username } = useAuth();

  const CustomGrid = styled(Grid)({
    height: 220,
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
  });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Typography Section */}
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 270,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "Bold",
                    fontSize: 20,
                    mb: 2,
                    color: "black",
                  }}
                >
                  Welcome to LedgerLearn {username}!
                </Typography>

                <Typography sx={{ color: "#6c757d" }}>
                  Where we demystify accounting concepts and empower you to take
                  control of your financial understanding. Whether you’re a
                  student, a small business owner, or simply interested in
                  mastering the language of business, our interactive courses
                  are designed to make accounting principles accessible and
                  engaging.
                </Typography>
                <br />
                <Typography sx={{ color: "#6c757d" }}>
                  From balance sheets to income statements, join us on a journey
                  to financial literacy and unlock the secrets of successful
                  financial management.
                </Typography>
              </Paper>
            </Grid>

            {/* Logo Section */}
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "auto",
                }}
              >
                <Box
                  sx={{
                    width: 239,
                    height: 239,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={Logo}
                    alt="LedgerLearn Logo"
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Courses Section */}
            <CustomGrid item xs={12}>
              <Courses />
            </CustomGrid>

            {/* Leaderboard Section */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <UsersList />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Welcome;

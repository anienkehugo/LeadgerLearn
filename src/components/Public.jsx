import { Typography, Container, Box, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login"; // Importing an icon

const Public = () => {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ mt: 8, mb: 4, borderRadius: 2, p: 2 }}
    >
      <Paper
        elevation={6} // Increased shadow depth for a more distinct card look
        sx={{
          padding: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Welcome Message */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(to right, #00d9e1, #01579b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          gutterBottom
        >
          Welcome to LedgerLearn!
        </Typography>

        {/* Subheading */}
        <Typography
          sx={{ fontSize: 14, fontWeight: "medium", color: "#6c757d", mb: 3 }}
        >
          Where we make accounting education fun and accessible to everyone!
        </Typography>

        {/* Login Button with Icon */}
        <Box sx={{ mt: 3, mb: 5 }}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            startIcon={<LoginIcon />} // Added a login icon
            sx={{
              background: "linear-gradient(to right, #00d9e1, #01579b)",
              color: "white !important",
              textTransform: "uppercase", // Changed to uppercase for emphasis
              padding: "12px 30px",
              fontWeight: "bold",
              borderRadius: "8px",
              "&:hover": {
                background: "linear-gradient(to right, #01579b, #00d9e1)",
                transform: "scale(1.05)", // Subtle hover animation
                transition: "transform 0.2s ease-in-out",
              },
            }}
          >
            User Login
          </Button>
        </Box>

        {/* About LedgerLearn Section */}
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: "bold",
            mb: 2,
            background: "linear-gradient(to right, #00d9e1, #01579b)", // Gradient background
            WebkitBackgroundClip: "text", // Clip the background to the text
            WebkitTextFillColor: "transparent", // Make the actual text transparent
          }}
        >
          About LedgerLearn
        </Typography>
        <Typography sx={{ color: "#555", lineHeight: 1.6 }}>
          LedgerLearn is the brainchild of a team of passionate educators and
          financial experts dedicated to making accounting education accessible
          to everyone. With backgrounds in accounting, education, and
          technology, our team is committed to providing high-quality, engaging,
          and practical accounting courses for students, professionals, and
          lifelong learners.
        </Typography>

        {/* Disclaimer Section */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="caption"
            component="p"
            sx={{ color: "#888", fontSize: 12 }}
          >
            Disclaimer: By attending this course, users agree to share their
            information, including username, score, and role, for the purpose of
            maintaining course progress and leaderboard functionality. This
            complies with the Protection of Personal Information (POPI) Act.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Public;

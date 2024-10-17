import { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  CssBaseline,
  Toolbar,
  Typography,
  Box,
  Container,
  TextField,
  Button,
  Alert,
} from "@mui/material"; // Added necessary imports
import Logo from "../../../public/no.png";

import Header from "./header";

const Contact = () => {
  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear form fields and show success message
    setName("");
    setEmail("");
    setMessage("");
    setSuccess(true);

    // Hide the success message after 5 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

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
                  height: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: 20,
                    mb: 2,
                    color: "black",
                  }}
                >
                  Need some help? Contact LeadgerLearn
                </Typography>

                <Typography sx={{ color: "#6c757d", mb: 2 }}>
                  If you have any questions or face any issues with the course,
                  feel free to reach out to us by filling out the form below or
                  contacting us directly through the information provided.
                </Typography>

                {/* Success Message */}
                {success && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Message submitted! We will get back to you as soon as
                    possible.
                  </Alert>
                )}

                {/* Contact Form */}
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <TextField
                    required
                    id="name"
                    label="Your Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    required
                    id="email"
                    label="Your Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    required
                    id="message"
                    label="Your Message"
                    fullWidth
                    multiline
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </form>

                <Typography sx={{ mt: 4, fontWeight: "bold" }}>
                  Contact Information
                </Typography>
                <Typography>Email: support@ledgerlearn.com</Typography>
                <Typography>Phone: +27 123 456 7890</Typography>
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
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Contact;

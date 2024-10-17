import { Typography, Paper, Grid, Box, Container } from "@mui/material";
import Logo from "../../../public/no.png";
import Header from "./header";

export default function overview() {
  return (
    <Box sx={{ display: "flex" }}>
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 270,
              }}
            >
              <br />
              <br />

              <Typography sx={{ color: "#6c757d" }}>
                LedgerLearn is the brainchild of a team of passionate educators
                and financial experts dedicated to making accounting education
                accessible to everyone. With backgrounds in accounting,
                education, and technology, our team is committed to providing
                high-quality, engaging, and practical accounting courses for
                students, professionals, and lifelong learners. Our mission is
                to empower individuals with the knowledge and skills they need
                to understand and manage their finances effectively. We believe
                that financial literacy is a fundamental skill that can
                transform lives and create a more financially secure future for
                all. At LedgerLearn, we are not just teaching accounting; we are
                building a community of learners who are eager to explore the
                world of finance and take control of their financial futures.
                Join us on this exciting journey and discover the power of
                accounting with LedgerLearn!
              </Typography>
            </Paper>
          </Grid>
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
        </Container>
      </Box>
    </Box>
  );
}

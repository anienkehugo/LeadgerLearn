import Typography from "@mui/material/Typography";
import { Container, Box, Paper, Divider } from "@mui/material";
import Susan1 from "../../../public/Susan1.png";
import Susan2 from "../../../public/Susan2.png";

const Taxation = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Introduction to Taxation
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Typography
            variant="body1"
            sx={{
              mb: 3,
            }}
          >
            Assume all balance sheet balances start with zero and income
            statement balances with zero: Susan starts a business by depositing
            R100 000 into a business account HotShoes. HotShoes received
            materials to be used in manufacturing in the amount of R40 000 incl.
            VAT on credit. At the end of the month, Susan takes an inventory of
            the materials left over and finds its value is R18 000.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 3,
            }}
          >
            Assume that Susan included 15% VAT in the sales listed above, and
            HotShoes pays VAT before the end of the month. Calculate the income
            tax of 28% that is due for the month and make provision so that your
            books show a more accurate expected profit.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mt: 4,
            }}
          >
            <img
              src={Susan1}
              alt="Susan explaining taxation concept"
              style={{
                width: "45%",
                borderRadius: "12px",
                boxShadow: "0px 6px 15px rgba(0,0,0,0.15)",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />

            <img
              src={Susan2}
              alt="Taxation example"
              style={{
                width: "45%",
                borderRadius: "12px",
                boxShadow: "0px 6px 15px rgba(0,0,0,0.15)",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Taxation;

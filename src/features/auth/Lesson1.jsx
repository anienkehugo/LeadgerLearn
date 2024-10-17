import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckAttempt from "./CheckAttempt";
import Susan1 from "../../../public/Susan1.png";
import Susan2 from "../../../public/Susan2.png";
import Logo from "../../../public/no.png";

const AccountingFundamentals = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ padding: "30px", borderRadius: "12px" }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: "bold",
              background: "linear-gradient(to right, #00d9e1, #01579b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Lesson 1: Mastering Debits and Credits in Accounting
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div>
                <IconButton size="small">
                  <img
                    src={Logo}
                    alt="tip-icon"
                    style={{ width: 24, height: 24 }}
                  />
                </IconButton>
              </div>
              <Typography variant="h5">Learning Objectives:</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                - Understand the accounting principles of{" "}
                <span style={{ color: "#01579b", fontWeight: "bold" }}>
                  debits
                </span>{" "}
                and{" "}
                <span style={{ color: "#01579b", fontWeight: "bold" }}>
                  credits
                </span>
                .
                <br />- Learn how to apply these principles to different
                transactions.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div>
                <IconButton size="small">
                  {/* Use an img tag for your custom icon */}
                  <img
                    src={Logo}
                    alt="tip-icon"
                    style={{ width: 24, height: 24 }}
                  />
                </IconButton>
              </div>
              <Typography variant="h5">Key Concepts</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">Double-Entry Accounting</Typography>
                  <Typography variant="body2">
                    - Every transaction affects at least two accounts.
                    <br />
                    - One account is debited, and another account is credited.
                    <br />- The total debits must always equal total credits.
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6">Debits and Credits</Typography>
                  <Typography variant="body2">
                    - Debit (Dr) increases assets and expenses, decreases
                    liabilities and equity.
                    <br />- Credit (Cr) increases liabilities, equity, and
                    revenue, decreases assets.
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "medium",
                    }}
                  >
                    Common Account Types
                  </Typography>
                </Grid>

                {/* Add the table below the last Grid item */}
                <Grid item xs={12}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              backgroundColor: "#f5f5f5",
                              fontWeight: "bold",
                            }}
                          >
                            Account Type
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: "#f5f5f5",
                              fontWeight: "bold",
                            }}
                          >
                            Increases with
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: "#f5f5f5",
                              fontWeight: "bold",
                            }}
                          >
                            Decreases with
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Assets</TableCell>
                          <TableCell>Debit</TableCell>
                          <TableCell>Credit</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Liabilities</TableCell>
                          <TableCell>Credit</TableCell>
                          <TableCell>Debit</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Equity</TableCell>
                          <TableCell>Credit</TableCell>
                          <TableCell>Debit</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Revenue</TableCell>
                          <TableCell>Credit</TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Expenses</TableCell>
                          <TableCell>Debit</TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div>
                <IconButton size="small">
                  {/* Use an img tag for your custom icon */}
                  <img
                    src={Logo}
                    alt="tip-icon"
                    style={{ width: 24, height: 24 }}
                  />
                </IconButton>
              </div>
              <Typography variant="h5">
                Practical Example: ABC Electronics
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h6" gutterBottom>
                Let’s apply these concepts to{" "}
                <span
                  style={{
                    fontWeight: "Bold",
                    background: "linear-gradient(to right, #00d9e1, #01579b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ABC Electronics
                </span>
              </Typography>

              <Typography variant="body2">
                In the ABC Electronics example, the business owner initially
                invests R150,000 into the company’s bank account. This
                transaction increases the company’s cash (an asset) and reflects
                the owner’s contribution in the capital account (equity). Later,
                ABC Electronics purchases inventory worth R50,000 on credit.
                This transaction increases inventory (an asset) while
                simultaneously increasing accounts payable (a liability), as the
                company has not yet paid for the goods. This illustrates the
                basic double-entry principle, where each transaction affects two
                accounts, and total debits equal total credits.
              </Typography>
              <br />

              <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                      >
                        Transactional Description
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                      >
                        Account
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                      >
                        Debit
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                      >
                        Credit
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Initial Capital Contribution</TableCell>
                      <TableCell>Bank</TableCell>
                      <TableCell>R150,000</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Capital</TableCell>
                      <TableCell></TableCell>
                      <TableCell>R150,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Purchase of Inventory on Credit</TableCell>
                      <TableCell>Inventory</TableCell>
                      <TableCell>R50,000</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Accounts Payable</TableCell>
                      <TableCell></TableCell>
                      <TableCell>R50,000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div>
                <IconButton size="small">
                  {/* Use an img tag for your custom icon */}
                  <img
                    src={Logo}
                    alt="tip-icon"
                    style={{ width: 24, height: 24 }}
                  />
                </IconButton>
              </div>
              <Typography variant="h5">Debit and Credit Exercise</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                }}
              >
                Assume all balance sheet balances start with zero and income
                statement balances with zero: Susan starts a business by
                depositing R100 000 into a business account HotShoes. HotShoes
                received materials to be used in manufacturing in the amount of
                R40 000 incl. VAT on credit. At the end of the month, Susan
                takes an inventory of the materials left over and finds its
                value is R18 000.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                }}
              >
                Assume that Susan included 15% VAT in the sales listed above,
                and HotShoes pays VAT before the end of the month.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexWrap: "wrap",

                  mt: 4,
                }}
              >
                <img
                  src={Susan1}
                  alt="Susan explaining taxation concept"
                  style={{
                    width: "30%",
                    borderRadius: "12px",
                    boxShadow: "0px 6px 15px rgba(0,0,0,0.15)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />

                <img
                  src={Susan2}
                  alt="Taxation example"
                  style={{
                    width: "30%",
                    borderRadius: "12px",
                    boxShadow: "0px 6px 15px rgba(0,0,0,0.15)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </Box>
              <CheckAttempt />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Container>
    </Box>
  );
};

export default AccountingFundamentals;

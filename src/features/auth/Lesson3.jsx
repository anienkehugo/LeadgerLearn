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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Tooltip, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CheckAttempt3 from "./CheckAttempt3";
import Susan1 from "../../../public/Susan1.png";
import Susan2 from "../../../public/Susan2.png";
import Logo from "../../../public/no.png";

const Lesson3 = () => {
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
            Lesson 3: Constructing Financial Position Statements
          </Typography>
          <Divider sx={{ mb: 3 }} />
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
              <Typography variant="h5">Learning Objectives:</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                - Understand how to prepare a{" "}
                <span style={{ color: "#01579b", fontWeight: "bold" }}>
                  financial position statement
                </span>{" "}
                (also known as a balance sheet).
                <br />- Learn how to categorize items as assets, liabilities, or
                equity.
                <br />- Apply the{" "}
                <span style={{ color: "#01579b", fontWeight: "bold" }}>
                  accounting equation
                </span>{" "}
                to ensure the balance sheet is accurate.
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
                  <Typography variant="h6">Balance Sheet Equation</Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontWeight: "bold",
                      background: "linear-gradient(to right, #00d9e1, #01579b)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Assets = Liabilities + Equity
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6">Asset Classification</Typography>
                  <Grid item xs={12}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                backgroundColor: "#f5f5f5",
                                fontWeight: "Bold",
                              }}
                            >
                              Asset Type
                            </TableCell>
                            <TableCell
                              sx={{
                                backgroundColor: "#f5f5f5",
                                fontWeight: "Bold",
                              }}
                            >
                              Examples
                            </TableCell>
                            <TableCell
                              sx={{
                                backgroundColor: "#f5f5f5",
                                fontWeight: "Bold",
                              }}
                            >
                              Classification
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>Current Assets</TableCell>
                            <TableCell>
                              Cash, Inventory, Receivables (expected to be
                              converted to cash within a year).
                            </TableCell>
                            <TableCell>Short-term assets</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Non-current Assets</TableCell>
                            <TableCell>
                              Property, Equipment, Investments
                            </TableCell>
                            <TableCell>Long-term assets</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6">
                    Liabilites Classification
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              backgroundColor: "#f5f5f5",
                              fontWeight: "Bold",
                            }}
                          >
                            Liability Type
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: "#f5f5f5",
                              fontWeight: "Bold",
                            }}
                          >
                            Examples
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: "#f5f5f5",
                              fontWeight: "Bold",
                            }}
                          >
                            Classification
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Current Liabilities</TableCell>
                          <TableCell>
                            Accounts Payable, Short-term Loans
                          </TableCell>
                          <TableCell>Due within a year</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Non-current Liabilities</TableCell>
                          <TableCell>Long-term Debt</TableCell>
                          <TableCell>Due after a year</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6">Equity</Typography>
                </Grid>

                <Grid item xs={12}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              backgroundColor: "#f5f5f5",
                              fontWeight: "Bold",
                            }}
                          >
                            Equity Type
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: "#f5f5f5",
                              fontWeight: "Bold",
                            }}
                          >
                            Examples
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Owner’s Equity</TableCell>
                          <TableCell>Capital Contributions</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Retained Earnings</TableCell>
                          <TableCell>
                            Profits retained in the business
                          </TableCell>
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
                <IconButton>
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
                In the ABC Electronics example, the balance sheet shows that the
                business has total assets of R200,000. This includes R150,000 in
                cash (from the owner’s initial investment) and R50,000 worth of
                inventory. On the liabilities side, the company owes R50,000 in
                accounts payable, as it purchased inventory on credit. The
                owner’s equity consists of the R150,000 capital contribution,
                resulting in total liabilities and equity of R200,000. This
                demonstrates the accounting equation (Assets = Liabilities +
                Equity), where the total assets are perfectly balanced with the
                liabilities and equity.
              </Typography>

              <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ backgroundColor: "#f5f5f5", fontWeight: "Bold" }}
                      >
                        Item
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#f5f5f5", fontWeight: "Bold" }}
                      >
                        Account
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "Bold" }}>Assets</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Bank</TableCell>
                      <TableCell>R150,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Inventory</TableCell>
                      <TableCell>R50,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "Bold" }}>
                        Total Assets
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "Bold",
                          borderTop: "solid",
                          borderTopWidth: 2,
                          borderBottom: "double 5px",
                          borderColor: "black",
                        }}
                      >
                        R200,000
                        <Tooltip title="R150,000 + R50,000">
                          <IconButton size="small">
                            <InfoIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "Bold" }}>
                        Liabilities
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Accounts Payable</TableCell>
                      <TableCell>R50,000</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "Bold" }}>
                        Total Liabilities
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "Bold",
                          borderTop: "solid",
                          borderTopWidth: 2,
                          borderBottom: "double 5px",
                          borderColor: "black",
                        }}
                      >
                        R50,000
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "Bold" }}>Equity</TableCell>
                      <TableCell sx={{ fontWeight: "Bold" }}></TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Owner’s Equity (Capital)</TableCell>
                      <TableCell>R150,000</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "Bold" }}>
                        Total Equity
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "Bold",
                          borderTop: "solid",
                          borderTopWidth: 2,
                          borderBottom: "double 5px",
                          borderColor: "black",
                        }}
                      >
                        R150,000
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "Bold" }}>
                        Total Liabilities + Equity
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "Bold",
                          borderTop: "solid",
                          borderTopWidth: 2,
                          borderBottom: "double 5px",
                          borderColor: "black",
                        }}
                      >
                        R200,000
                        <Tooltip title="R150,000 + R50,000">
                          <IconButton size="small">
                            <InfoIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
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
              <Typography variant="h5">Financial Position Exercise</Typography>
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
              <CheckAttempt3 />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Container>
    </Box>
  );
};

export default Lesson3;

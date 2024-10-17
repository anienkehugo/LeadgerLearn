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
import CheckAttempt2 from "./CheckAttempt2";
import Susan1 from "../../../public/Susan1.png";
import Susan2 from "../../../public/Susan2.png";
import Logo from "../../../public/no.png";

const Lesson2 = () => {
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
            Lesson 2: Crafting Comprehensive Income Statements
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
                - Understand how to compile an income statement.
                <br />- Learn how to calculate{" "}
                <span style={{ color: "#01579b", fontWeight: "bold" }}>
                  gross profit, operating income,
                </span>{" "}
                and{" "}
                <span style={{ color: "#01579b", fontWeight: "bold" }}>
                  net income.
                </span>
                <br />- Develop skills to accurately report revenues and
                expenses.
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
                  <Typography variant="h6">
                    Income Statement Structure
                  </Typography>
                  <Typography variant="body2" paragraph>
                    - Revenues (e.g., sales) minus Cost of Goods Sold (COGS)
                    equals Gross Profit.
                    <br />
                    - Subtract Operating Expenses (e.g., salaries, rent) from
                    gross profit to get Operating Income.
                    <br />- Subtract Income Tax to determine Net Income
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6">
                    Gross Profit Calculation:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    - Gross Profit = Sales Revenue - COGS
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6">Net Income</Typography>
                  <Typography variant="body2" paragraph>
                    - Subtract operating expenses and provision for income tax
                    from gross profit.
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
                            Section
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: "#f5f5f5",
                              fontWeight: "Bold",
                            }}
                          >
                            Calculation
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Revenues</TableCell>
                          <TableCell>Cash Sales + Credit Sales</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Cost of Goods Sold (COGS)</TableCell>
                          <TableCell>
                            COGS for Cash Sales + COGS for Credit Sales
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Gross Profit</TableCell>
                          <TableCell>Revenues - COGS</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Operating Expenses</TableCell>
                          <TableCell>Total expenses (salaries, etc.)</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Operating Income</TableCell>
                          <TableCell>
                            Gross Profit - Operating Expenses
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Income Tax</TableCell>
                          <TableCell>28% of Operating Income</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Net Income</TableCell>
                          <TableCell>Operating Income - Income Tax</TableCell>
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
                In the ABC Electronics example, the company earns revenue
                through cash sales of R60,000 and credit sales of R25,000,
                totaling R85,000 in revenue. The cost of goods sold (COGS) for
                these sales is R42,000, leaving a gross profit of R43,000. After
                subtracting operating expenses of R15,000, the business has
                operating income of R28,000. ABC Electronics also has to account
                for a 28% income tax on this operating income, which is R7,840.
                The net income, or the final profit for the period, comes to
                R35,160. This example demonstrates how revenues and expenses are
                organized to determine profitability.
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
                      <TableCell>Cash Sales</TableCell>
                      <TableCell>R60,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Credit Sales</TableCell>
                      <TableCell>R25,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "Bold" }}>
                        Total Revenue
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
                        R85,000
                        <Tooltip title="R60,000 + R25,000">
                          <IconButton size="small">
                            <InfoIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>COGS for Cash Sales</TableCell>
                      <TableCell>R30,000</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>COGS for Credit Sales</TableCell>
                      <TableCell>R12,000</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "Bold" }}>
                        Total COGS
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
                        R42,000
                        <Tooltip title="R30,000 + R12,000">
                          <IconButton size="small">
                            <InfoIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Gross Profit</TableCell>
                      <TableCell>
                        R43,000
                        <Tooltip title="R85,000 - R42,000">
                          <IconButton size="small">
                            <InfoIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Operating Expenses</TableCell>
                      <TableCell>R15,000</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Income Tax (28%)</TableCell>
                      <TableCell>
                        R7,840
                        <Tooltip title="(R43,000 - R15,000) * 0.28">
                          <IconButton size="small">
                            <InfoIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ fontWeight: "Bold" }}>
                        Net Income
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
                        R35,160
                        <Tooltip title="R43,000 - R7,840">
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
              <Typography variant="h5">Income Statement Exercise</Typography>
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
              <CheckAttempt2 />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Container>
    </Box>
  );
};

export default Lesson2;

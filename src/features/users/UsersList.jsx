import { useState } from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { PulseLoader } from "react-spinners";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAuth from "../../hooks/useAuth";
import {
  TextField,
  TableSortLabel,
  TablePagination,
  Box,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const { isAdmin } = useAuth();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("username");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let content;

  if (isLoading) {
    content = (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
        <PulseLoader color={"#00d9e1"} />
      </Box>
    );
  } else if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  } else if (isSuccess) {
    const { ids } = users;

    const filteredUsers = ids?.filter((userId) => {
      const user = users.entities[userId];
      return (
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.roles.some((role) =>
          role.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });

    const sortedUsers = filteredUsers?.sort((a, b) => {
      const userA = users.entities[a][orderBy];
      const userB = users.entities[b][orderBy];

      if (orderBy === "score") {
        return order === "asc" ? userA - userB : userB - userA;
      } else {
        return order === "asc"
          ? userA.localeCompare(userB)
          : userB.localeCompare(userA);
      }
    });

    const paginatedUsers = sortedUsers?.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    const tableContent =
      paginatedUsers?.length &&
      paginatedUsers.map((userId) => <User key={userId} userId={userId} />);

    content = (
      <Box sx={{ padding: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: 30, mb: 2 }}>
            Leaderboard
          </Typography>
          <TextField
            label="Search Users"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ mb: 2, ml: 85, borderRadius: "5px" }} // Added rounded corners
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            }}
          />
          {isLoading && <PulseLoader color={"#00d9e1"} />}
        </Box>
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ borderRadius: "10px" }}
        >
          <Table sx={{ minWidth: 650 }} label="user tablearia-">
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              {" "}
              {/* Very light grey background */}
              <TableRow>
                <TableCell
                  sortDirection={orderBy === "username" ? order : false}
                  sx={{
                    color: "#555",
                    fontWeight: "bold",
                    borderBottom: "1px solid #e0e0e0",
                  }} // Darker grey color for text
                >
                  <TableSortLabel
                    active={orderBy === "username"}
                    direction={orderBy === "username" ? order : "asc"}
                    onClick={() => handleRequestSort("username")}
                  >
                    Username
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "#555",
                    fontWeight: "bold",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  {" "}
                  {/* Darker grey for text */}
                  Roles
                </TableCell>
                <TableCell
                  sortDirection={orderBy === "score" ? order : false}
                  align="right"
                  sx={{
                    color: "#555",
                    fontWeight: "bold",
                    borderBottom: "1px solid #e0e0e0",
                  }} // Darker grey color for text
                >
                  <TableSortLabel
                    active={orderBy === "score"}
                    direction={orderBy === "score" ? order : "asc"}
                    onClick={() => handleRequestSort("score")}
                  >
                    Score
                  </TableSortLabel>
                </TableCell>
                {isAdmin && (
                  <TableCell
                    align="right"
                    sx={{
                      color: "#555",
                      fontWeight: "bold",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    {" "}
                    {/* Darker grey for text */}
                    Edit
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody sx={{ borderBottom: "1px solid #e0e0e0" }}>
              {tableContent}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    );
  }

  return content;
};

export default UsersList;

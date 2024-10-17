import PropTypes from "prop-types";

import { useGetUsersQuery } from "./usersApiSlice";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { memo, useState } from "react";
import useAuth from "../../hooks/useAuth";
import EditUserForm from "./EditUserForm";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { IconButton } from "@mui/material";

const User = ({ userId }) => {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const { isAdmin } = useAuth();

  // State to control the modal
  const [openModal, setOpenModal] = useState(false);

  if (user) {
    const handleEdit = () => setOpenModal(true); // Open the modal

    const userRolesString = user.roles.toString().replaceAll(",", ", ");
    const cellStatus = user.active ? {} : { color: "gray", opacity: 0.5 };

    return (
      <>
        <TableRow>
          <TableCell sx={cellStatus}>{user.username}</TableCell>
          <TableCell align="right" sx={cellStatus}>
            {userRolesString}
          </TableCell>
          <TableCell align="right" sx={cellStatus}>
            {user.score}
          </TableCell>
          {isAdmin && (
            <TableCell align="right" sx={cellStatus}>
              <IconButton
                onClick={handleEdit} // Trigger modal on click
                variant="outlined"
                sx={{
                  borderColor: "#f5f5f5",
                  color: "#555",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    borderColor: "#e0e0e0",
                  },
                }}
              >
                <EditNoteIcon />
              </IconButton>
            </TableCell>
          )}
        </TableRow>

        {/* Modal for Edit User Form */}
        <EditUserForm
          user={user}
          open={openModal}
          onClose={() => setOpenModal(false)} // Close the modal
        />
      </>
    );
  } else {
    return null;
  }
};

// Prop validation
User.propTypes = {
  userId: PropTypes.string.isRequired,
};

const memoizedUser = memo(User);

export default memoizedUser;

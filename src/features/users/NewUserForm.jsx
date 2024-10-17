import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import {
  Avatar,
  Typography,
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess }] = useAddNewUserMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Student"]);
  const [score] = useState(0); // Default score value
  const [errorMsg, setErrorMsg] = useState(""); // Error message for invalid password

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
    setErrorMsg(""); // Reset error message when password is modified
  };

  const onRolesChanged = (event) => {
    const selectedRole = event.target.name;
    setRoles((prevRoles) =>
      prevRoles.includes(selectedRole)
        ? prevRoles.filter((role) => role !== selectedRole)
        : [...prevRoles, selectedRole]
    );
  };

  // Check if password is only numeric
  const isPasswordOnlyNumbers = (password) => /^\d+$/.test(password);

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      if (isPasswordOnlyNumbers(password)) {
        setErrorMsg("Password must contain at least one letter."); // Set error message
      } else {
        await addNewUser({ username, password, roles, score });
        navigate("/dash");
      }
    }
  };

  const onCancelClicked = () => {
    navigate("/dash"); // Redirects to users list or another page when cancel is clicked
  };

  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Avatar
          sx={{
            m: 1,
            background: "linear-gradient(to right, #00d9e1, #01579b)",
            width: 56,
            height: 56,
          }}
        >
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create New User
        </Typography>

        {/* Show error message for invalid password */}
        {errorMsg && (
          <Typography color="error" sx={{ mt: 1 }}>
            {errorMsg}
          </Typography>
        )}

        <Box
          component="form"
          noValidate
          sx={{ mt: 3, width: "100%" }}
          onSubmit={onSaveUserClicked}
        >
          {/* Username Field */}
          <TextField
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={onUsernameChanged}
            margin="normal"
            fullWidth
            label="Username"
            className={validUserClass}
            required
          />

          {/* Password Field */}
          <TextField
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChanged}
            margin="normal"
            fullWidth
            label="Password"
            className={validPwdClass}
            required
          />

          {/* Roles Checkboxes */}
          <FormGroup>
            {Object.values(ROLES).map((role) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={roles.includes(role)}
                    onChange={onRolesChanged}
                    name={role}
                  />
                }
                label={role}
                key={role}
              />
            ))}
          </FormGroup>

          {/* Save Button */}
          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              mb: 2,
              color: "white",
              background: "linear-gradient(to right, #00d9e1, #01579b)",
              padding: "12px 20px",
              fontWeight: "bold",
              "&:hover": {
                background: "linear-gradient(to right, #01579b, #00d9e1)",
                transform: "scale(1.05)",
                transition: "transform 0.2s ease-in-out",
              },
            }}
            disabled={!canSave}
          >
            Save User
          </Button>

          {/* Cancel Button */}
          <Button
            fullWidth
            sx={{
              mb: 2,
              color: "white",
              background: "linear-gradient(to right, #ff4c4c, #b30000)", // Red gradient
              padding: "12px 20px",
              fontWeight: "bold",
              "&:hover": {
                background: "linear-gradient(to right, #b30000, #ff4c4c)", // Reverse gradient on hover
                transform: "scale(1.05)",
                transition: "transform 0.2s ease-in-out",
              },
            }}
            onClick={onCancelClicked}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NewUserForm;

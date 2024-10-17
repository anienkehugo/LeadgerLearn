import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import {
  useGetQuizAttemptsQuery,
  useDeleteQuizAttemptMutation,
} from "../auth/quizAttemptApiSlice"; // Import to fetch quiz attempts
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import {
  Card,
  List,
  IconButton,
  ListItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Container,
  Box,
  Typography,
  TextField,
  Avatar,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useGetQuizzesQuery } from "../auth/quizApiSlice";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^(?!\d+$)[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user, open, onClose }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();
  const [deleteQuizAttempt] = useDeleteQuizAttemptMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active] = useState(user.active);
  const [score, setScore] = useState(user.score || 0);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [quizAttemptToDelete, setQuizAttemptToDelete] = useState(null);

  // Fetch all quizzes to get titles
  const {
    data: quizzes,
    // isLoading: loadingQuizzes,
    // isError: errorLoadingQuizzes,
  } = useGetQuizzesQuery();

  const {
    data: quizAttempts,
    refetch: refetchQuizAttempts,
    // isLoading: loadingAttempts,
    // isError: errorLoadingAttempts,
  } = useGetQuizAttemptsQuery();

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername(user.username);
      setPassword("");
      setScore(user.score);
      setQuizAttemptToDelete(null);
      navigate("/dash");
    }
  }, [isSuccess, isDelSuccess, navigate, user.username, user.score]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onScoreChanged = (e) => setScore(Number(e.target.value));

  // const onRolesChanged = (e) => {
  //   const values = Array.from(
  //     e.target.selectedOptions,
  //     (option) => option.value
  //   );
  //   setRoles(values);
  // };

  const onSaveUserClicked = async () => {
    if (password) {
      await updateUser({
        id: user.id,
        username,
        password,
        roles,
        active,
        score,
      });
    } else {
      await updateUser({ id: user.id, username, roles, active, score });
    }
    onClose();
  };

  const openConfirmationDialog = (quizAttemptId) => {
    setQuizAttemptToDelete(quizAttemptId);
    setConfirmationDialogOpen(true);
  };

  // const handleDeleteAttempt = async (quizAttemptId) => {
  //   console.log({ quizAttemptId });
  //   if (quizAttemptId) {
  //     await deleteQuizAttempt({ id: quizAttemptId }); // Pass the quizAttemptId for deletion
  //     setConfirmationDialogOpen(false); // Close the dialog after deletion
  //     setQuizAttemptToDelete(null); // Clear the stored quiz attempt after deletion if necessary
  //     refetchQuizAttempts();
  //   }
  //   onClose();
  // };

  const handleDeleteClick = (quizAttemptId) => {
    setQuizAttemptToDelete(quizAttemptId);
    setConfirmationDialogOpen(true);
  };

  const handleClose = () => {
    setConfirmationDialogOpen(false);
    setQuizAttemptToDelete(null);
  };

  const handleDeleteAttempt = async () => {
    console.log({ quizAttemptToDelete });
    if (quizAttemptToDelete) {
      await deleteQuizAttempt({ id: quizAttemptToDelete });
      setConfirmationDialogOpen(false);
      setQuizAttemptToDelete(null);
      refetchQuizAttempts();
    }
    onClose();
  };
  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  const attemptedQuizzes = quizAttempts
    ? Object.values(quizAttempts.entities)
        .filter((attempt) => attempt.user.toString() === user.id)
        .map((attempt) => {
          const quiz = quizzes?.entities[attempt.quiz]; // Access the quiz data
          return {
            quizId: attempt.quiz, // Store quiz ID
            quizAttemptId: attempt.id, // Store quiz attempt ID
            title: quiz ? quiz.title : "Unknown Quiz", // Include quiz title
          };
        })
    : [];

  let canSave;
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : "";
  //const validRolesClass = !roles.length ? "form__input--incomplete" : "";
  const validScoreClass = score < 0 ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  // // Update onRolesChanged to handle multiple values from Autocomplete
  // const onRolesChanged = (event, newValue) => {
  //   setRoles(newValue);
  // };

  const onRolesChanged = (event) => {
    const selectedRole = event.target.name;
    setRoles((prevRoles) =>
      prevRoles.includes(selectedRole)
        ? prevRoles.filter((role) => role !== selectedRole)
        : [...prevRoles, selectedRole]
    );
  };

  const content = (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="edit-user-dialog-title"
      >
        <DialogContent>
          <p className={errClass}>{errContent}</p>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
                <EditNoteIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Edit User
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 1, width: "100%" }} // Full width to match login form
              >
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
                />
                {/* <TextField
                  id="score"
                  name="score"
                  type="number"
                  value={score}
                  onChange={onScoreChanged}
                  margin="normal"
                  fullWidth
                  label="Score"
                  className={validScoreClass}
                  required
                />
            
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
                </FormGroup> */}
                <Grid container spacing={2}>
                  {/* Score TextField */}
                  <Grid item xs={6}>
                    <TextField
                      id="score"
                      name="score"
                      type="number"
                      value={score}
                      onChange={onScoreChanged}
                      margin="normal"
                      fullWidth
                      label="Score"
                      className={validScoreClass}
                      required
                    />
                  </Grid>

                  {/* Roles FormGroup */}
                  <Grid item xs={6}>
                    {/* <FormGroup>
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
                    </FormGroup> */}
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
                  </Grid>
                </Grid>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Attempted Quizzes:
                </Typography>

                {attemptedQuizzes.length > 0 ? (
                  <Card
                    sx={{
                      mb: 2,
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h6">Attempted Quizzes</Typography>
                    <List>
                      {attemptedQuizzes.map(
                        ({ title, quizAttemptId }, index) => (
                          <ListItem
                            key={quizAttemptId}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <TextField
                              value={title}
                              label={`Quiz ${index + 1}`}
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              InputProps={{
                                readOnly: true,
                              }}
                              sx={{ flexGrow: 1 }} // Makes the text field take up available space
                            />
                            <IconButton
                              aria-label="delete"
                              onClick={() =>
                                openConfirmationDialog(quizAttemptId)
                              }
                              sx={{ color: "red", ml: 2 }}
                            >
                              <DeleteOutlineOutlinedIcon />
                            </IconButton>
                          </ListItem>
                        )
                      )}
                    </List>
                  </Card>
                ) : (
                  <Typography variant="body1">No quizzes attempted.</Typography>
                )}

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs>
                    <Button
                      type="button"
                      onClick={onDeleteUserClicked}
                      disabled={isLoading}
                      color="error"
                    >
                      Delete
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="button"
                      onClick={onClose}
                      disabled={isLoading}
                    >
                      Close
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="button"
                      onClick={onSaveUserClicked}
                      disabled={!canSave}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>

          {/* Confirmation Dialog */}
          <Dialog
            open={confirmationDialogOpen}
            onClose={() => setConfirmationDialogOpen(false)}
            aria-labelledby="alert-dialog-title" // Add accessibility label
            aria-describedby="alert-dialog-description" // Add accessibility description
          >
            <DialogTitle id="alert-dialog-title">
              Are you sure you want to delete this quiz attempt?
            </DialogTitle>
            <DialogActions id="alert-dialog-description">
              <Button
                onClick={() => setConfirmationDialogOpen(false)}
                color="primary"
              >
                Cancel
              </Button>
              <Button onClick={() => handleDeleteClick()} color="primary">
                Delete
              </Button>

              {/* Confirmation Dialog */}
              <Dialog open={confirmationDialogOpen} onClose={handleClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete this quiz attempt? This
                    action cannot be undone.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleDeleteAttempt} color="primary">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </DialogActions>
          </Dialog>
        </DialogContent>
      </Dialog>
    </>
  );

  return content;
};

EditUserForm.propTypes = {
  user: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired, // Add this prop
  onClose: PropTypes.func.isRequired, // Add this prop
};

export default EditUserForm;

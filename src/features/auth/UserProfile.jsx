import { useEffect, useState } from "react";
import { useGetUsersQuery } from "../users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Logo from "../../../public/no.png";
import { useGetQuizAttemptsQuery } from "./quizAttemptApiSlice";
import { useGetQuizzesQuery } from "./quizApiSlice";
//import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PropTypes from "prop-types";
//import { useNavigate } from "react-router-dom";

const UserProfile = ({ open, handleClose }) => {
  const { id: userId } = useAuth(); // Assuming useAuth hook gives the current user's ID

  // Fetch user data from usersApiSlice
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId], // Fetch the current user by ID
    }),
  });

  // Fetch all quiz attempts
  const {
    data: attempts,
    isLoading: loadingAttempts,
    isError: errorLoadingAttempts,
    error: attemptsError,
  } = useGetQuizAttemptsQuery();

  // Fetch all quizzes
  const {
    data: quizzes,
    isLoading: loadingQuizzes,
    isError: errorLoadingQuizzes,
    error: quizzesError,
  } = useGetQuizzesQuery();

  // States for tracking attempted quizzes and titles
  const [userQuizAttempts, setUserQuizAttempts] = useState([]);
  const [quizTitles, setQuizTitles] = useState([]);

  useEffect(() => {
    if (!userId) {
      console.error("Missing userId");
    }
  }, [userId]);

  useEffect(() => {
    if (attempts && quizzes && userId) {
      // Filter attempts made by the current user
      const filteredAttempts = Object.values(attempts.entities).filter(
        (attempt) => attempt.user.toString() === userId
      );

      // Map quiz titles based on quizId, including the score
      const titlesWithScores = filteredAttempts.map((attempt) => {
        const quiz = quizzes.entities[attempt.quiz.toString()];
        const score = attempt.score; // Assuming score is in attempt
        return {
          title: quiz?.title || `Quiz ID: ${attempt.quiz}`,
          score: score ?? 0, // Use 0 if no score available
          quizId: attempt.quiz.toString(),
        };
      });

      setUserQuizAttempts(filteredAttempts);
      setQuizTitles(titlesWithScores); // Update to store title with scores
    }
  }, [attempts, quizzes, userId]);

  // Loading and error handling
  if (loadingAttempts || loadingQuizzes || !user)
    return <PulseLoader color={"#FFF"} />;
  if (errorLoadingAttempts) return <p>Error: {attemptsError?.data?.message}</p>;
  if (errorLoadingQuizzes) return <p>Error: {quizzesError?.data?.message}</p>;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar alt="Profile Picture" src={Logo}>
            {user.username[0].toUpperCase()}
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile: {user.username}
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Username:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{user.username}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle1">Score:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{user.score ?? 0}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle1">Roles:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{user.roles.join(", ")}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle1">Active:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {user.active ? "Yes" : "No"}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle1">Quizzes Attempted:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{userQuizAttempts.length}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle1">Quizzes List:</Typography>
            </Grid>
            <Grid item xs={6}>
              {quizTitles.length > 0 ? (
                quizTitles.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body1">
                      {item.title} - Score: {item.score}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body1">No quizzes attempted</Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center", // Center the button horizontally
        }}
      >
        <Button type="button" onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UserProfile.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default UserProfile;

// import { useEffect, useState } from "react";
// import { useGetUsersQuery } from "../users/usersApiSlice";
// import useAuth from "../../hooks/useAuth";
// import PulseLoader from "react-spinners/PulseLoader";
// import {
//   Box,
//   Typography,
//   Avatar,
//   Grid,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogActions,
//   Tooltip,
// } from "@mui/material";
// import Logo from "../../../public/no.png";
// import { useGetQuizAttemptsQuery } from "./quizAttemptApiSlice";
// import { useGetQuizzesQuery } from "./quizApiSlice";
// import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
// import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";

// const UserProfile = ({ open, handleClose }) => {
//   const { id: userId } = useAuth();
//   const navigate = useNavigate();

//   const { user } = useGetUsersQuery("usersList", {
//     selectFromResult: ({ data }) => ({
//       user: data?.entities[userId],
//     }),
//   });

//   const {
//     data: attempts,
//     isLoading: loadingAttempts,
//     isError: errorLoadingAttempts,
//     error: attemptsError,
//   } = useGetQuizAttemptsQuery();

//   const {
//     data: quizzes,
//     isLoading: loadingQuizzes,
//     isError: errorLoadingQuizzes,
//     error: quizzesError,
//   } = useGetQuizzesQuery();

//   const [userQuizAttempts, setUserQuizAttempts] = useState([]);
//   const [quizTitles, setQuizTitles] = useState([]);

//   useEffect(() => {
//     if (userId) {
//       // Fetch quiz attempts for the user
//       const filteredAttempts = Object.values(attempts.entities || {}).filter(
//         (attempt) => attempt.user.toString() === userId
//       );

//       const titlesWithScores = filteredAttempts.map((attempt) => {
//         const quiz = quizzes.entities[attempt.quiz.toString()];
//         return {
//           title: quiz?.title || `Quiz ID: ${attempt.quiz}`,
//           score: attempt.score ?? 0,
//           quizId: attempt.quiz.toString(),
//         };
//       });

//       setUserQuizAttempts(filteredAttempts);
//       setQuizTitles(titlesWithScores);
//     }
//   }, [attempts, quizzes, userId]);

//   if (loadingAttempts || loadingQuizzes || !user)
//     return <PulseLoader color={"#FFF"} />;

//   if (errorLoadingAttempts)
//     return (
//       <Typography color="error">
//         Error: {attemptsError?.data?.message}
//       </Typography>
//     );

//   if (errorLoadingQuizzes)
//     return (
//       <Typography color="error">
//         Error: {quizzesError?.data?.message}
//       </Typography>
//     );

//   const handleReviewClick = (quizId) => {
//     navigate(`/dash/CheckAttempt/${quizId}`);
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//       <DialogContent>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             padding: 2,
//           }}
//         >
//           <Avatar alt="Profile Picture" src={Logo}>
//             {user.username[0].toUpperCase()}
//           </Avatar>
//           <Typography component="h1" variant="h5" sx={{ marginTop: 2 }}>
//             Profile: {user.username}
//           </Typography>
//           <Grid container spacing={2} sx={{ marginTop: 2 }}>
//             <Grid item xs={6}>
//               <Typography variant="subtitle1">Username:</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body1">{user.username}</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="subtitle1">Score:</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body1">{user.score ?? 0}</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="subtitle1">Roles:</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body1">{user.roles.join(", ")}</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="subtitle1">Active:</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body1">
//                 {user.active ? "Yes" : "No"}
//               </Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="subtitle1">Quizzes Attempted:</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body1">{userQuizAttempts.length}</Typography>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="subtitle1">Quizzes List:</Typography>
//               {quizTitles.length > 0 ? (
//                 quizTitles.map((item, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       padding: 1,
//                       border: "1px solid #ccc",
//                       borderRadius: 1,
//                       marginTop: 1,
//                       "&:hover": {
//                         backgroundColor: "#f5f5f5",
//                       },
//                     }}
//                   >
//                     <Typography variant="body1">
//                       {item.title} - Score: {item.score}
//                     </Typography>
//                     <Tooltip title="Review Attempt" arrow>
//                       <span>
//                         <Button
//                           size="small"
//                           color="primary"
//                           startIcon={<RemoveRedEyeOutlinedIcon />}
//                           onClick={() => handleReviewClick(item.quizId)}
//                         />
//                       </span>
//                     </Tooltip>
//                   </Box>
//                 ))
//               ) : (
//                 <Typography variant="body1">No quizzes attempted</Typography>
//               )}
//             </Grid>
//           </Grid>
//         </Box>
//       </DialogContent>
//       <DialogActions sx={{ justifyContent: "center" }}>
//         <Button onClick={handleClose} color="primary" variant="outlined">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// UserProfile.propTypes = {
//   open: PropTypes.bool,
//   handleClose: PropTypes.func,
// };

// export default UserProfile;

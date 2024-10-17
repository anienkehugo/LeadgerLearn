import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import { useGetQuizAttemptsQuery } from "./quizAttemptApiSlice";
import { useGetQuizzesQuery } from "./quizApiSlice";
import useAuth from "../../hooks/useAuth";
import Quiz1 from "./Quiz";

const QuizAttemptCheck = () => {
  const quizId = "66f309fd2f120505eef67edf";
  const { id: userId } = useAuth();

  const {
    data: attempts,
    isLoading: loadingAttempts,
    isError: errorLoadingAttempts,
    error: attemptsError,
  } = useGetQuizAttemptsQuery();

  const {
    data: quizzes,
    isLoading: loadingQuizzes,
    isError: errorLoadingQuizzes,
    error: quizzesError,
  } = useGetQuizzesQuery();

  const [filledUserAttempts, setFilledUserAttempts] = useState([]);

  const [dateAttempted, setDateAttempted] = useState("");
  const [quizScore, setQuizScore] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false); // State to manage quiz visibility

  useEffect(() => {
    if (!userId) {
      console.error("Missing userId");
    }
  }, [userId]);

  useEffect(() => {
    if (attempts && quizzes && userId) {
      const userAttempts = Object.values(attempts.entities).filter(
        (attempt) =>
          attempt.user.toString() === userId &&
          attempt.quiz.toString() === quizId
      );

      const quiz = quizzes.entities[quizId];

      if (userAttempts.length > 0 && quiz) {
        const updatedAttempts = userAttempts.map((attempt) => {
          setDateAttempted(attempt.dateAttempted);
          setQuizScore(attempt.score);
          setQuizQuestions(quiz.questions);

          return {
            ...attempt,
            answers: attempt.answers.map((answer, index) => ({
              amount: answer.amount || "",
              debit: answer.debit || "",
              credit: answer.credit || "",
              description: answer.description || "",
              date: quiz.questions[index]?.date || "",
            })),
          };
        });

        setFilledUserAttempts(updatedAttempts);
      }
    }
  }, [attempts, quizzes, userId]);

  if (loadingAttempts || loadingQuizzes) return <p>Loading...</p>;
  if (errorLoadingAttempts) return <p>Error: {attemptsError?.data?.message}</p>;
  if (errorLoadingQuizzes) return <p>Error: {quizzesError?.data?.message}</p>;

  // Check if there are no filled user attempts
  if (filledUserAttempts.length === 0) {
    // Handle button click to show Quiz1 component
    const handleButtonClick = () => {
      setShowQuiz(true); // Set state to true to show Quiz1
    };

    return (
      <>
        {!showQuiz ? (
          <Button
            variant="outlined"
            sx={{
              mt: 3,
              fontSize: "1.1rem",
              px: 5,
              py: 1.5,
              borderRadius: "8px",
              display: "block",
              mx: "auto",
            }}
            onClick={handleButtonClick}
          >
            Attempt Quiz
          </Button>
        ) : (
          <Quiz1 />
        )}
      </>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        {/* Display Quiz Title, Date Attempted, and Score */}

        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "Bold" }}>
          Date Attempted: {new Date(dateAttempted).toLocaleDateString()}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "Bold" }}>
          Score: {quizScore}
        </Typography>

        <Table sx={{ minWidth: 650 }} aria-label="quiz attempt table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderRight: 1, borderRightColor: "white" }}>
                <Typography sx={{ fontWeight: "bold" }}>Amount</Typography>
              </TableCell>
              <TableCell sx={{ borderRight: 1, borderRightColor: "white" }}>
                <Typography sx={{ fontWeight: "bold" }}>Debit</Typography>
              </TableCell>
              <TableCell sx={{ borderRight: 1, borderRightColor: "white" }}>
                <Typography sx={{ fontWeight: "bold" }}>Credit</Typography>
              </TableCell>
              <TableCell sx={{ borderRight: 1, borderRightColor: "white" }}>
                <Typography sx={{ fontWeight: "bold" }}>Date</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: "bold" }}>Description</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: "bold" }}>Description</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filledUserAttempts.map((attempt) =>
              attempt.answers.map((answer, index) => (
                <TableRow key={`${attempt.id}-${index}`}>
                  <TableCell
                    sx={{
                      backgroundColor: answer.amount === "" ? "red" : "white",
                      borderRight: 1,
                      borderRightColor: "white",
                    }}
                  >
                    {answer.amount !== "" ? answer.amount : ""}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: answer.debit === "" ? "red" : "white",
                      borderRight: 1,
                      borderRightColor: "white",
                    }}
                  >
                    {answer.debit !== "" ? answer.debit : ""}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: answer.credit === "" ? "red" : "white",
                      borderRight: 1,
                      borderRightColor: "white",
                    }}
                  >
                    {answer.credit !== "" ? answer.credit : ""}
                  </TableCell>
                  <TableCell sx={{ borderRight: 1, borderRightColor: "white" }}>
                    {answer.date}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor:
                        answer.description === "" ? "red" : "white",
                    }}
                  >
                    {answer.description !== "" ? answer.description : ""}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Review Answers
          </Typography>

          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="quiz attempt table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ backgroundColor: "#f5f5f5", fontWeight: "Bold" }}
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f5f5f5", fontWeight: "Bold" }}
                  >
                    Debit
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f5f5f5", fontWeight: "Bold" }}
                  >
                    Credit
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f5f5f5", fontWeight: "Bold" }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f5f5f5", fontWeight: "Bold" }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#f5f5f5", fontWeight: "Bold" }}
                  >
                    Explanation
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quizQuestions.map((question, index) => {
                  return (
                    <TableRow key={`question-${index}`}>
                      <TableCell>{question.amount || "N/A"}</TableCell>
                      <TableCell>{question.debit || "N/A"}</TableCell>
                      <TableCell>{question.credit || "N/A"}</TableCell>
                      <TableCell>{question.date || "N/A"}</TableCell>
                      <TableCell>{question.description || "N/A"}</TableCell>
                      <TableCell>{question.explanation}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Container>
  );
};

export default QuizAttemptCheck;

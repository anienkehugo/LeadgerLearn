import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Paper,
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
import Quiz2 from "./Quiz2";

const QuizAttemptCheck3 = () => {
  const quizId = "66f30a612f120505eef67ee6";
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

  const [filledAttempts, setFilledUserAttempts] = useState([]);

  const [dateAttempted, setDateAttempted] = useState("");
  const [quizScore, setQuizScore] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const [showQuiz, setShowQuiz] = useState(false);

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
            answers: attempt.answers.map((answer) => ({
              description: answer.description || "",
              debit: answer.debit || "",
              credit: answer.credit || "",
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

  if (filledAttempts.length === 0) {
    const handleButtonClick = () => {
      setShowQuiz(true);
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
          <Quiz2 />
        )}
      </>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "Bold" }}>
          Date Attempted: {new Date(dateAttempted).toLocaleDateString()}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "Bold" }}>
          Score: {quizScore}
        </Typography>

        <Table component={Paper} sx={{ mb: 4 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  borderRight: 1,
                  borderRightColor: "white",
                  backgroundColor: "#f5f5f5",
                  fontWeight: "Bold",
                }}
              >
                <Typography sx={{ fontWeight: "Bold" }}>Description</Typography>
              </TableCell>
              <TableCell
                sx={{
                  borderRight: 1,
                  borderRightColor: "white",
                  backgroundColor: "#f5f5f5",
                  fontWeight: "Bold",
                }}
              >
                <Typography sx={{ fontWeight: "Bold" }}>Debit</Typography>
              </TableCell>
              <TableCell
                sx={{
                  borderRight: 1,
                  borderRightColor: "white",
                  backgroundColor: "#f5f5f5",
                  fontWeight: "Bold",
                }}
              >
                <Typography sx={{ fontWeight: "Bold" }}>Credit</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filledAttempts.map((attempt) =>
              attempt.answers.map((answer, index) => {
                const quizQuestion = quizQuestions[index];

                return (
                  <TableRow key={`${attempt.id}-${index}`}>
                    <TableCell
                      sx={{
                        backgroundColor:
                          answer.description === "" &&
                          quizQuestion.description !== ""
                            ? "red"
                            : quizQuestion.description === ""
                            ? "#f5f5f5" // Grey out cell if quiz question description is empty
                            : "white",
                        borderRight: 1,
                        borderRightColor: "white",
                      }}
                    >
                      {answer.description !== "" ? answer.description : ""}
                    </TableCell>

                    <TableCell
                      sx={{
                        backgroundColor:
                          answer.debit === "" && quizQuestion.debit !== ""
                            ? "red"
                            : quizQuestion.debit === ""
                            ? "#f5f5f5" // Grey out cell if quiz question debit is empty
                            : "white",
                        borderRight: 1,
                        borderRightColor: "white",
                      }}
                    >
                      {answer.debit !== "" ? answer.debit : ""}
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor:
                          answer.credit === "" && quizQuestion.credit !== ""
                            ? "red"
                            : quizQuestion.credit === ""
                            ? "#f5f5f5" // Grey out cell if quiz question credit is empty
                            : "white",
                        borderRight: 1,
                        borderRightColor: "white",
                      }}
                    >
                      {answer.credit !== "" ? answer.credit : ""}
                    </TableCell>
                  </TableRow>
                );
              })
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
                    Description
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
                    Explanation
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quizQuestions.map((question, index) => (
                  <TableRow key={`question-${index}`}>
                    <TableCell>{question.description || "N/A"}</TableCell>
                    <TableCell>{question.debit || "N/A"}</TableCell>
                    <TableCell>{question.credit || "N/A"}</TableCell>
                    <TableCell>{question.explanation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Container>
  );
};

export default QuizAttemptCheck3;

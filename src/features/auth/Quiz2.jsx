import { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Box,
  Divider,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetQuizzesQuery } from "./quizApiSlice";
import useAuth from "../../hooks/useAuth"; // Import the custom hook for authentication
import { useAddNewQuizAttemptMutation } from "./quizAttemptApiSlice";
import { useUpdateUserMutation } from "../users/usersApiSlice"; // Import mutation to update user's score
import { useGetUsersQuery } from "../users/usersApiSlice";

const ItemTypes = {
  ANSWER: "answer",
};

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const DraggableAnswer = ({ value, type, disabled }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.ANSWER,
      item: { value, type },
      canDrag: !disabled,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [disabled]
  );
  return (
    <Paper
      ref={disabled ? null : drag}
      sx={{
        backgroundColor: isDragging ? "lightgrey" : "#00796b",
        background: "linear-gradient(to right, #00d9e1, #01579b)",
        color: "white",
        textAlign: "center",
        cursor: disabled ? "not-allowed" : "move",
        opacity: disabled ? 0.6 : 1,
        fontSize: "0.8rem", // Smaller font size
        height: 30, // Reduced height
        width: 140, // Reduced width
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "6px", // Slightly smaller rounded corners
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)", // Smaller shadow
        margin: "6px",
      }}
    >
      {value}
    </Paper>
  );
};

DraggableAnswer.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const DroppableCell = ({
  onDrop,
  children,
  disabled,
  handleRemove,
  isEmpty,
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.ANSWER,
      drop: (item) => !disabled && !isEmpty && onDrop(item.value),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [disabled, isEmpty]
  );

  return (
    <TableCell
      ref={disabled || isEmpty ? null : drop}
      sx={{
        backgroundColor: isEmpty
          ? "lightgray"
          : canDrop && isOver
          ? "#c8e6c9"
          : "white",
        border: "1px solid #ddd",
        height: "50px",
        textAlign: "center",
        position: "relative",
        borderRadius: "4px", // Slightly rounded cell corners
        padding: "10px",
        color: isEmpty ? "gray" : "black",
      }}
    >
      {children}
      {!disabled && !isEmpty && children && (
        <IconButton aria-label="delete" size="small" onClick={handleRemove}>
          <DeleteIcon
            fontSize="small"
            sx={{
              color: "red",
            }}
          />
        </IconButton>
      )}
    </TableCell>
  );
};

DroppableCell.propTypes = {
  onDrop: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleRemove: PropTypes.func.isRequired,
  isEmpty: PropTypes.bool.isRequired, // Add isEmpty prop
};

const Quiz2 = () => {
  const quizId = "66f30a612f120505eef67ee6";
  const { data: quizzes, isLoading, isError, error } = useGetQuizzesQuery();
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const { id: userId } = useAuth();
  const [updateUser] = useUpdateUserMutation(); // Mutation for updating the user score

  const [addNewQuizAttempt, { isLoading: isSubmitting }] =
    useAddNewQuizAttemptMutation();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId], // Fetch the current user by ID
    }),
  });

  useEffect(() => {
    if (!isLoading && quizzes?.entities && quizId) {
      const quiz = quizzes.entities[quizId];
      if (quiz) {
        setUserAnswers(
          quiz.questions.map(() => ({
            description: "",
            debit: "",
            credit: "",
          }))
        );

        // Filter out answers where debit or credit is an empty string
        const possibleAnswers = quiz.questions.flatMap((item) => [
          { value: item.description, type: "description" },
          ...(item.debit ? [{ value: item.debit, type: "debit" }] : []), // Only include debit if not empty
          ...(item.credit ? [{ value: item.credit, type: "credit" }] : []), // Only include credit if not empty
        ]);

        setShuffledAnswers(shuffleArray(possibleAnswers));
      }
    }
  }, [isLoading, quizzes, quizId]);

  // Handle drag and drop
  const handleDrop = (index, field, value) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index][field] = value;
    setUserAnswers(updatedAnswers);
  };

  const handleRemove = (index, field) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index][field] = ""; // Clear the dropped value
    setUserAnswers(updatedAnswers);
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async () => {
    let currentQuizScore = 0;
    userAnswers.forEach((answer, index) => {
      const correctAnswer = quizzes.entities[quizId].questions[index];
      if (
        answer.description === correctAnswer.description &&
        answer.debit === correctAnswer.debit &&
        answer.credit === correctAnswer.credit
      ) {
        currentQuizScore += 1;
      }
    });
    setQuizScore(currentQuizScore);
    setQuizSubmitted(true);
    const quizAttempt = {
      user: userId,
      quiz: quizId,
      answers: userAnswers,
      score: currentQuizScore,
      dateAttempted: new Date().toISOString(),
    };
    const finalScore = currentQuizScore + user.score;
    try {
      await addNewQuizAttempt({
        userId: quizAttempt.user,
        quizId: quizAttempt.quiz,
        answers: quizAttempt.answers,
        score: quizAttempt.score,
        dateAttempted: quizAttempt.dateAttempted,
      }).unwrap();

      await updateUser({
        id: userId, // Provide userId as part of the update
        score: finalScore, // Send the updated score
      }).unwrap();

      console.log("Quiz attempt submitted and user score updated successfully");
    } catch (error) {
      console.error("Error submitting quiz attempt:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;
  if (!quizzes?.entities || !quizId) return <p>Quiz not found!</p>;

  const quiz = quizzes.entities[quizId];

  const Bus = "business's";

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Container maxWidth="lg">
        <DndProvider backend={HTML5Backend}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
          >
            {quiz.title}
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" sx={{ mb: 3 }}>
            In this exercise, you will prepare an income statement for Susan’s
            business, HotShoes, based on the provided financial information. You
            will need to fill in the income statement template with the
            appropriate values for revenues, costs, and expenses.
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            As you complete the income statement, ensure that you accurately
            categorize each item and follow the correct format. Pay close
            attention to the calculation of gross profit, operating expenses,
            and net income to reflect a true picture of the ${Bus} performance
            for the month. Good luck!
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ borderRadius: "12px", mb: 4 }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="debits and credits table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: "#f5f5f5" }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Description
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f5f5f5" }}>
                    <Typography sx={{ fontWeight: "bold" }}>Debit</Typography>
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f5f5f5" }}>
                    <Typography sx={{ fontWeight: "bold" }}>Credit</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userAnswers.map((row, index) => (
                  <TableRow key={index}>
                    <DroppableCell
                      onDrop={(value) =>
                        handleDrop(index, "description", value)
                      }
                      disabled={quizSubmitted}
                      handleRemove={() => handleRemove(index, "description")}
                      isEmpty={!quiz.questions[index].description} // Check if description is empty
                    >
                      {row.description}
                    </DroppableCell>
                    <DroppableCell
                      onDrop={(value) => handleDrop(index, "debit", value)}
                      disabled={quizSubmitted}
                      handleRemove={() => handleRemove(index, "debit")}
                      isEmpty={!quiz.questions[index].debit} // Check if debit is empty
                    >
                      {row.debit}
                    </DroppableCell>
                    <DroppableCell
                      onDrop={(value) => handleDrop(index, "credit", value)}
                      disabled={quizSubmitted}
                      handleRemove={() => handleRemove(index, "credit")}
                      isEmpty={!quiz.questions[index].credit} // Check if credit is empty
                    >
                      {row.credit}
                    </DroppableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2} justifyContent="center">
            {shuffledAnswers.map((answer, index) => (
              <DraggableAnswer
                key={index}
                value={answer.value}
                type={answer.type}
                disabled={quizSubmitted}
              />
            ))}
          </Grid>
          <Divider sx={{ my: 3 }} />
          {quizSubmitted ? (
            <Typography variant="h6">
              You scored {quizScore} out of {userAnswers.length}.
            </Typography>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => setIsDialogOpen(true)} // Open the modal on click
                disabled={isSubmitting}
                sx={{
                  mt: 3,
                  fontSize: "1.1rem",
                  px: 5,
                  py: 1.5,
                  borderRadius: "8px",
                  display: "block",
                  mx: "auto",
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit Exercise"}
              </Button>

              {/* Confirmation Modal */}
              <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                aria-labelledby="submit-confirmation-dialog"
                aria-describedby="submit-confirmation-dialog-description"
              >
                <DialogTitle id="submit-confirmation-dialog">
                  Submit Quiz?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="submit-confirmation-dialog-description">
                    Are you sure you want to submit your answers? Once
                    submitted, you won’t be able to make any changes.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button
                    onClick={() => {
                      setIsDialogOpen(false); // Close the modal
                      handleSubmit(); // Call the submit function if confirmed
                    }}
                    autoFocus
                  >
                    Yes, Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
          {/* <Button
                variant="outlined"
                onClick={handleSubmit}
                disabled={quizSubmitted}
                sx={{ mr: 1 }}
              >
                Submit
              </Button>

              {quizScore !== null && (
                <Typography sx={{ mt: 2 }}>
                  Your score is: {quizScore} out of {quiz.questions.length}
                </Typography>
              )} */}
        </DndProvider>
      </Container>
    </Box>
  );
};

export default Quiz2;

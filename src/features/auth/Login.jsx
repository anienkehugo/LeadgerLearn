import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { PulseLoader } from "react-spinners";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, IconButton } from "@mui/material";
//import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import ArrowBackIcon
import HomeIcon from "@mui/icons-material/Home";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const handleBackClick = () => {
    navigate("/");
  };

  if (isLoading) return <PulseLoader color={"#FFF"} />;

  const content = (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative", // Add relative positioning for the back button
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Back button */}

          <IconButton
            sx={{ right: 160, color: "#6c757d" }}
            onClick={handleBackClick}
          >
            <HomeIcon />
          </IconButton>
          <Avatar
            sx={{
              m: 1,
              background: "linear-gradient(to right, #00d9e1, #01579b)",
              width: 60,
              height: 60,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            Sign In
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              id="username"
              ref={userRef}
              value={username}
              onChange={handleUserInput}
              required
              margin="normal"
              fullWidth
              label="Username"
              name="username"
              autoComplete="username"
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "#f9f9f9",
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#00d9e1",
                  },
              }}
            />

            <TextField
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              autoComplete="current-password"
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "#f9f9f9",
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#00d9e1",
                  },
              }}
            />

            <Button
              type="submit"
              onSubmit={handleSubmit}
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                mb: 2,
                background: "linear-gradient(to right, #00d9e1, #01579b)",
                padding: "12px 20px",
                fontWeight: "bold",
                "&:hover": {
                  background: "linear-gradient(to right, #01579b, #00d9e1)",
                  transform: "scale(1.05)",
                  transition: "transform 0.2s ease-in-out",
                },
              }}
            >
              Sign In
            </Button>
            {errMsg && (
              <Typography
                ref={errRef}
                sx={{
                  color: "red",
                  fontSize: "14px",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                {errMsg}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );

  return content;
};

export default Login;

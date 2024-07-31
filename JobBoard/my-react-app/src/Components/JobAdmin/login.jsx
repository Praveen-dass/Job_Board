import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  CssBaseline,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [loginerror,setLoginError] = useState(null);
  const navigator = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const user = await axios.get(
      `http://localhost:8080/admin/get/${username}`
    );

    if (user.data == null) {
      setLoginError("Username does not exists");
    } else if(user.data.password != password) {
      setLoginError("Password is incorrect");
    }
    else{
      navigator("/post/home");
    }
  };

  return (
    <div style={styles.loginContainer}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "white",
            borderRadius: "30px",
            padding: 2,
          }}
        >
          <LockOutlined
            sx={{ fontSize: "50px", color: "rgba(0, 86, 179, 1)" }}
          />
          <h2 style={styles.header}>Login</h2>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "80%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Name"
              name="username"
              autoComplete="user Name"
              autoFocus
              value={username}
              onChange={(e) => setusername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon style={{ color: "rgba(0, 86, 179, 1)" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon style={{ color: "rgba(0, 86, 179, 1)" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 1 }}
            />
            <p className="text-red-600 px-12">{loginerror}</p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1, padding: "6px 0" }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

const styles = {
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    backgroundImage: 'url("https://wallpaperaccess.com/full/2416118.jpg")',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  header: {
    color: "rgba(0, 86, 179, 1)",
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
  },
};

export default AdminLogin;

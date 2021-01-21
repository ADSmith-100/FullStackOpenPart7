import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { initializeUser } from "../reducers/userReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(initializeUser(user));

      setUsername("");
      setPassword("");
      history.push("/");
    } catch (exception) {
      dispatch(setNotification(`wrong credentials`, 10, "error"));
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />

          <Form.Label>password</Form.Label>

          <Form.Control
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />

          <Button variant="primary" id="login-button" type="submit">
            login
          </Button>
        </Form.Group>
      </form>
    </div>
  );
};

export default LoginForm;

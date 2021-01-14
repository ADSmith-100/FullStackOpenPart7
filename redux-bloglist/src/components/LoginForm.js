import React, { useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { initializeUser } from "../reducers/userReducer";

//will need to refactor to save info about user with REDUX

const LoginForm = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(initializeUser());
  //   //   // const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
  //   //   // if (loggedUserJSON) {
  //   //   //   const user = JSON.parse(loggedUserJSON);
  //   //   //   setUser(user);
  //   //   //   console.log(user);
  //   //   //   blogService.setToken(user.token);
  //   //   // }
  // }, [dispatch]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);

  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   window.localStorage.removeItem("loggedBlogappUser");
  //   setUser(null);
  // };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);

      setUsername("");
      setPassword("");

      dispatch(initializeUser());
    } catch (exception) {
      dispatch(setNotification(`wrong credentials`, 10, "error"));
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

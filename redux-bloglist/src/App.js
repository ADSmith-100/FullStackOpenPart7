import React, { useEffect } from "react";
import NewBlog from "./components/NewBlog";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/usersReducer";
import LoginForm from "./components/LoginForm";
import { clearUser } from "./reducers/userReducer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Menu from "./components/Menu";
import Users from "./components/Users";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

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

  return (
    <Router>
      {/* <Menu /> */}
      <Switch>
        <div>
          <h1>Blog App REDUX</h1>
          <Notification />
          {user === null ? (
            <LoginForm />
          ) : (
            <div>
              <div>
                {user.name} logged-in{" "}
                <button id="logout" onClick={() => dispatch(clearUser())}>
                  logout
                </button>
              </div>

              <NewBlog />
              <Blogs />
              <Route path="/users">
                <Users />
              </Route>
            </div>
          )}
        </div>
      </Switch>
    </Router>
  );
};
export default App;

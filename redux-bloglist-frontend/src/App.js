import React, { useEffect } from "react";
import NewBlog from "./components/NewBlog";
import Blogs from "./components/Blogs";
import BlogView from "./components/BlogView";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { initializeUser } from "./reducers/userReducer";

import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Menu from "./components/Menu";
import Users from "./components/Users";
import UserBlogs from "./components/UserBlogs";

const App = () => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

  if (user === null) user = JSON.parse(loggedUserJSON);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser());
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  return (
    <Router>
      {/* <Menu /> */}

      <div>
        <h1>Blog App REDUX</h1>
        <Notification />
        <Menu user={user} />
      </div>

      <Switch>
        <Route path="/blogs/:id">
          <BlogView blogs={blogs} user={user} />
        </Route>
        <Route path="/users/:id">
          <UserBlogs />
        </Route>
        <Route path="/users">
          {user ? <Users /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/">
          <Blogs user={user} />
          <NewBlog user={user} />
        </Route>
      </Switch>
    </Router>
  );
};
export default App;

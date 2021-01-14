import React, { useEffect } from "react";
import NewBlog from "./components/NewBlog";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import LoginForm from "./components/LoginForm";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      <h1>Blog App REDUX</h1>
      <Notification />
      <LoginForm />
      <NewBlog />
      <Blogs />
    </div>
  );
};
export default App;

import React, { useEffect } from "react";
import NewBlog from "./components/NewBlog";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
// import { initializeUser } from "./reducers/userReducer";
import LoginForm from "./components/LoginForm";
import { clearUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
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
        </div>
      )}
    </div>
  );
};
export default App;

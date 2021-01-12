import React from "react";
import NewBlog from "./components/NewBlog";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";

const App = () => {
  return (
    <div>
      <h1>Blog App REDUX</h1>
      <Notification />
      <NewBlog />
      <Blogs />
    </div>
  );
};
export default App;

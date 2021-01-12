import React from "react";
import NewBlog from "./components/NewBlog";
import Blogs from "./components/Blogs";

const App = () => {
  return (
    <div>
      <h1>Blog App REDUX</h1>
      <NewBlog />
      <Blogs />
    </div>
  );
};
export default App;

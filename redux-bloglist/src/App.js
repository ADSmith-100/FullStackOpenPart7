import React from "react";
import { createBlog } from "./reducers/blogReducer";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state);

  const addBlog = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";
    dispatch(createBlog(title, author, url));
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <input name="author" />
        <input name="title" />
        <input name="url" />
        <button type="submit">add</button>
      </form>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title} {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

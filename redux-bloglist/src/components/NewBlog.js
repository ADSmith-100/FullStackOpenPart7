import React from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const NewBlog = (props) => {
  const dispatch = useDispatch();

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
    <form onSubmit={addBlog}>
      <input name="author" />
      <input name="title" />
      <input name="url" />
      <button type="submit">add</button>
    </form>
  );
};

export default NewBlog;

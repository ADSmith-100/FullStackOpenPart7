import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const NewBlog = (props) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

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
    dispatch(
      setNotification(`you created '${title}' by ${author}`, 10, "success")
    );
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>Add Blog</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>

      <form style={showWhenVisible} onSubmit={addBlog}>
        <h2>Create a new blog</h2>
        author:{""}
        <input name="author" />
        title:{""}
        <input name="title" />
        url:{""}
        <input name="url" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewBlog;

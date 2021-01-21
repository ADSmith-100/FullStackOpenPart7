import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const NewBlog = (props) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";
    try {
      const newBlog = await blogService.create(title, author, url);
      dispatch(createBlog(newBlog));
      dispatch(
        setNotification(`you created '${title}' by ${author}`, 10, "success")
      );
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 10, "error"));
    }
  };
  if (!props.user) {
    return null;
  }
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
        <Form.Group>
          <h2>Create a new blog</h2>
          <Form.Label> author:</Form.Label>
          <Form.Control name="author" />
          <Form.Label>title:</Form.Label>

          <Form.Control name="title" />
          <Form.Label>url:</Form.Label>

          <Form.Control name="url" />
          <Button variant="primary" type="submit">
            add
          </Button>
        </Form.Group>
      </form>
    </div>
  );
};

export default NewBlog;

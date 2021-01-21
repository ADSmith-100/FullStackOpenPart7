import React from "react";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { initializeBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Form, Button } from "react-bootstrap";

const NewComment = (props) => {
  const dispatch = useDispatch();
  const blogId = props.blog.id;
  const blogs = props.blogs;
  const blogTitle = props.blog.title;

  const addComment = async (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = "";
    try {
      const changedBlog = await blogService.addComment(blogId, comment);
      let newBlogs = blogs.map((blog) =>
        blog.id !== blogId ? blog : changedBlog
      );
      console.log(newBlogs);
      console.log("blogs", blogs);
      dispatch(initializeBlogs(newBlogs));
      dispatch(
        setNotification(`you commented on '${blogTitle}'`, 10, "success")
      );
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 10, "error"));
    }
  };

  return (
    <div>
      <form onSubmit={addComment}>
        <Form.Group>
          <h2>Add a comment</h2>
          <Form.Label>comment:</Form.Label>
          <Form.Control name="comment" />
          <Button variant="primary " type="submit">
            add
          </Button>
        </Form.Group>
      </form>
    </div>
  );
};

export default NewComment;

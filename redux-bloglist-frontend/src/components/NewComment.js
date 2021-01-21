import React from "react";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { initializeBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

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
        <h2>Add a comment</h2>
        comment:
        <input name="comment" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewComment;

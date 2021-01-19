import React from "react";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { initializeBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const NewComment = (props) => {
  const dispatch = useDispatch();
  const blogId = props.blog.id;
  const blogs = props.blogs;

  const addComment = (event, blogId) => {
    const comment = event.target.comment.value;
    const changedBlog = {
      comments: comment,
    };
    console.log(changedBlog);

    blogService.addComment(blogId, comment).then((returnedBlog) => {
      let newBlogs = blogs.map((blog) =>
        blog.id !== blogId ? blog : changedBlog
      );
      console.log(newBlogs);
      console.log("blogs", blogs);
      dispatch(initializeBlogs(newBlogs));
      dispatch(
        setNotification(`you liked '${changedBlog.title}'`, 10, "success")
      );
    });
  };

  return (
    <div>
      <form onSubmit={() => addComment(blogId)}>
        <h2>Add a comment</h2>
        comment:
        <input name="comment" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewComment;

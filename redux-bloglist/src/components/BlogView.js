import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import blogService from "../services/blogs";
import { initializeBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogView = (props) => {
  const dispatch = useDispatch();

  //   const blogs = props.blogs;
  const blogs = useSelector((state) => state.blogs);
  const match = useRouteMatch("/blogs/:id");

  const blogA = blogs.filter((b) => b.id === match.params.id);

  const handleAddLike = (id) => {
    addLikesTo(id);
  };

  const addLikesTo = (id) => {
    console.log(id);
    const changedBlog = {
      ...blogA[0],
      likes: blogA[0].likes + 1,
    };
    console.log(changedBlog);

    blogService.update(id, changedBlog).then((returnedBlog) => {
      // let jsonBlog = JSON.parse(returnedBlog);
      // nope server responds with object this throws error
      //returnedBlog from server was not in a format that the front end totally could use.  The User object was missing - only had id.
      let newBlogs = blogs.map((blog) => (blog.id !== id ? blog : changedBlog));
      console.log(newBlogs);
      console.log("blogs", blogs);
      dispatch(initializeBlogs(newBlogs));
      dispatch(
        setNotification(`you liked '${changedBlog.title}'`, 10, "success")
      );
    });
  };

  console.log(blogA[0].title);

  return (
    // <Blog />
    <div>
      <h2>{blogA[0].title}</h2>
      <p>
        <a href={blogA[0].url}>{blogA[0].url}</a>
      </p>
      <p>
        {blogA[0].likes}{" "}
        <button id="like" onClick={() => addLikesTo(blogA[0].id)}>
          like
        </button>{" "}
      </p>
    </div>
  );
};

export default BlogView;

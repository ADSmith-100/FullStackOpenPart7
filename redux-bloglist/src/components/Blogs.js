import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";
import { loggedUser } from "../reducers/userReducer";

import { setNotification } from "../reducers/notificationReducer";
// import { loggedUser } from "../reducers/userReducer";

export const Blog = ({ blog, addLikes, removeBlog, user, setBlogs }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loggedUser());
  }, [dispatch]);

  // const userActive = window.localStorage.getItem(
  //   "loggedBlogappUser",
  //   JSON.stringify(user) || null
  // );

  // console.log(userActive);

  const userActive = useSelector((state) => state.user) || "butt";

  // const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

  // const userA = JSON.parse(loggedUserJSON);
  // console.log(userA.name);

  const [extraDataVisible, setExtraDataVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleView = (e) => {
    e.preventDefault();
    setExtraDataVisible(true);
  };

  const handleHideData = (e) => {
    e.preventDefault(e);
    setExtraDataVisible(false);
    blogService.getAll().then((blogs) => {
      //make a copy of blogs array to avoid mutating issues
      let blogsByLikes = [...blogs];
      blogsByLikes.sort(
        (a, b) => (a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0)
        //could also use return a.likes.localeCompare(b.likes)I think
      );

      console.log(blogsByLikes);
      // setBlogs(blogsByLikes);
    });
  };

  const handleAddLike = (e) => {
    addLikes({
      likes: blog.likes + 1,
    });
  };

  const handleRemoveBlog = (id, name) => {
    removeBlog(id, name);
  };

  return (
    <div className="blog">
      {extraDataVisible === false ? (
        <div style={blogStyle}>
          {blog.title} {blog.author}{" "}
          <button id="view" onClick={handleView}>
            view
          </button>
        </div>
      ) : (
        <div style={blogStyle}>
          <p>
            {blog.title}{" "}
            <button id="hide" onClick={handleHideData}>
              hide
            </button>
          </p>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          {blog.user.name === undefined ? (
            <p>waiting...</p>
          ) : (
            <p>user: {blog.user.name}</p>
          )}

          <p>
            likes: {blog.likes}{" "}
            <button id="like" onClick={() => handleAddLike(blog.id)}>
              like
            </button>{" "}
          </p>

          {blog.user.name === userActive.name ? (
            <button onClick={() => handleRemoveBlog(blog.id, blog.title)}>
              remove
            </button>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const blogsByLikes = [...blogs];
  blogsByLikes.sort(
    (a, b) => (a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0)
    //could also use return a.likes.localeCompare(b.likes)I think
  );

  const removeBlog = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      blogService

        .remove(id)
        .then(() => {
          const newBlogs = blogs.filter((b) => b.id !== id);
          dispatch(initializeBlogs(newBlogs));
          dispatch(setNotification(`you deleted '${name}'`, 10, "success"));
        })
        .catch((error) => {
          console.log(error);
          dispatch(setNotification("something went wrong", 10, "error"));
          // notifyWith(`'${name}' was already removed from server`, error);
          // setErrorMessage(`'${name}' was already removed from server`);
          // setTimeout(() => {
          //   setErrorMessage(null);
          // }, 5000);
          const updateBlogs = blogs.filter((p) => p.id !== id);
          dispatch(initializeBlogs(updateBlogs));
        });
    } else {
      alert("operation cancelled");
    }
  };

  const addLikesTo = (id) => {
    const blog = blogs.find((b) => b.id === id);
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    blogService.update(id, changedBlog).then((returnedBlog) => {
      // let jsonBlog = JSON.parse(returnedBlog);
      // nope server responds with object this throws error
      //returnedBlog from server was not in a format that the front end totally could use.  The User object was missing - only had id.
      let newBlogs = blogs.map((blog) => (blog.id !== id ? blog : changedBlog));
      dispatch(initializeBlogs(newBlogs));
      dispatch(setNotification(`you liked '${blog.title}'`, 10, "success"));
    });
  };

  return (
    <>
      <div>
        <h2>Blogs</h2>

        {blogsByLikes.map((b) => (
          <p key={b.id}>
            <Link to={`/blogs/${b.id}`}>
              {b.title}
              {b.author}
            </Link>
          </p>
        ))}
      </div>
      {/* <h2>Blogs</h2>
        <ul>
          {blogsByLikes.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              addLikes={() => addLikesTo(blog.id)}
              removeBlog={() => removeBlog(blog.id, blog.title)}
            />
          ))}
        </ul>
      </div> */}
    </>
  );
};

export default Blogs;

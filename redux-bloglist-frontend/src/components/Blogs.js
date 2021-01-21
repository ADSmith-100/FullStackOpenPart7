import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";
import { loggedUser } from "../reducers/userReducer";

import { Table } from "react-bootstrap";

export const Blog = ({ blog, addLikes, removeBlog, user, setBlogs }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loggedUser());
  }, [dispatch]);

  const userActive = useSelector((state) => state.user) || "butt";

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
  // const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const blogsByLikes = [...blogs];
  blogsByLikes.sort(
    (a, b) => (a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0)
    //could also use return a.likes.localeCompare(b.likes)I think
  );

  return (
    <div>
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
          {blogsByLikes.map((b) => (
            <tr key={b.id}>
              <td>
                <Link to={`/blogs/${b.id}`}>
                  {b.title}
                  {b.author}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Blogs;

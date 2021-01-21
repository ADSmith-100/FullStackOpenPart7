import React from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import blogService from "../services/blogs";
import { initializeBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import NewComment from "./NewComment";

const BlogView = (props) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(initializeBlogs());
  // }, [dispatch]);

  const history = useHistory();

  //   const blogs = props.blogs;
  const blogs = props.blogs;
  const match = useRouteMatch("/blogs/:id");

  const blogA = blogs.filter((b) => b.id === match.params.id);

  // const userActive = useSelector((state) => state.user) || "butt";

  const handleRemoveBlog = (id, name) => {
    removeBlog(id, name);
  };

  const removeBlog = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      blogService

        .remove(id)
        .then(() => {
          history.push("/");
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

      dispatch(initializeBlogs(newBlogs));
      dispatch(
        setNotification(`you liked '${changedBlog.title}'`, 10, "success")
      );
    });
  };
  if (!blogA[0]) {
    return null;
  } else
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

        <p>created by {blogA[0].user.name || null} </p>

        {props.user === null ? (
          <></>
        ) : blogA[0].user.name === props.user.name ? (
          <button onClick={() => handleRemoveBlog(blogA[0].id, blogA[0].title)}>
            remove
          </button>
        ) : (
          <></>
        )}
        <div>
          <p>Comments</p>
          <ul>
            {blogA[0].comments.map((b) => (
              <li key={b.id}>{b}</li>
            ))}
          </ul>
          <NewComment blog={blogA[0]} blogs={props.blogs} />
        </div>
      </div>
    );
};

export default BlogView;
//

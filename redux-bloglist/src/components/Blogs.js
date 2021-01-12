import React from "react";
import { useSelector } from "react-redux";

const Blog = ({ blog }) => {
  return (
    <li key={blog.id}>
      {blog.title} {blog.author}
    </li>
  );
};

const Blogs = () => {
  //   const dispatch = useDispatch();
  const blogs = useSelector((state) => state);

  return (
    <ul>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </ul>
  );
};

export default Blogs;

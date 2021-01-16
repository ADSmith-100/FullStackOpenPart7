import { useSelector, useDispatch } from "react-redux";

const UserBlogs = () => {
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  //   const blogsByUser= blogs.map((b)b.)
  //     for each blog, the blog.user.id should match the id of the user you are viewing.

  return (
    <div>
      <h1>User?</h1>
      <h2>Added Blogs</h2>
      {blogsByUser}
    </div>
  );
};

export default UserBlogs;

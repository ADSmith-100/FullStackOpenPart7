import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

const UserBlogs = (props) => {
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);

  const match = useRouteMatch("/users/:id");

  const blogsByUser =
    blogs.filter((blog) => blog.user.id === match.params.id) || null;
  const user = users.filter((u) => u.id === match.params.id);

  console.log(blogsByUser);
  console.log(user[0]);
  //   const blogsByUser= blogs.map((b)b.)
  //     for each blog, the blog.user.id should match the id of the user you are viewing.

  //this works if the backend hasn't been able to send the user
  //info yet

  if (!user[0]) {
    return null;
  } else
    return (
      <div>
        <h1>{user[0].name}</h1>
        <h2>Added Blogs</h2>
        {blogsByUser.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </div>
    );
};

export default UserBlogs;

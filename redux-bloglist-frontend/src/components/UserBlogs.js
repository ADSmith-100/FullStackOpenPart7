import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { Table } from "react-bootstrap";

const UserBlogs = (props) => {
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);

  const match = useRouteMatch("/users/:id");

  const blogsByUser =
    blogs.filter((blog) => blog.user.id === match.params.id) || null;
  const user = users.filter((u) => u.id === match.params.id);

  //this works if the backend hasn't been able to send the user
  //info yet

  if (!user[0]) {
    return null;
  } else
    return (
      <div>
        <h1>{user[0].name}</h1>
        <h2>Added Blogs</h2>
        <Table striped>
          <tbody>
            {blogsByUser.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
};

export default UserBlogs;

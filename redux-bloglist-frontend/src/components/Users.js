import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th>{""}</th>
          <th>Blogs Created</th>
        </tr>
        {users.map((u) => (
          <tr key={u.id}>
            <td>
              {u.name}
              <Link to={`/users/${u.id}`}>{u.name}</Link>
            </td>
            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Users;

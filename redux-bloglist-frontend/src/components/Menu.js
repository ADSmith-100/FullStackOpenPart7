import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../reducers/userReducer";

const Menu = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const user = useSelector((state) => state.user);

  const padding = {
    paddingRight: 5,
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    history.push("/");
    dispatch(clearUser());
  };
  return (
    <div>
      <Link style={padding} to="/blogs">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {props.user ? (
        <>
          <em>{props.user.name} logged in</em>

          <button id="logout" onClick={handleLogout}>
            logout
          </button>
        </>
      ) : (
        <Link style={padding} to="/login">
          login
        </Link>
      )}
    </div>
  );
};

export default Menu;

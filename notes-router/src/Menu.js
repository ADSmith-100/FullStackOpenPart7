import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../reducers/userReducer";

const Menu = (user) => {
  const dispatch = useDispatch();

  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <Link style={padding} to="/blogs">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user ? (
        <>
          <em>{user} logged in</em>

          <button id="logout" onClick={() => dispatch(clearUser())}>
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

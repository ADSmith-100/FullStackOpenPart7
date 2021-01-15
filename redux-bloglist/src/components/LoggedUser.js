import React from "react";
import clearUser from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

const LoggedUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  <div>
    {user.name} logged-in{" "}
    <button id="logout" onClick={() => dispatch(clearUser())}>
      logout
    </button>
  </div>;
};

export default LoggedUser;

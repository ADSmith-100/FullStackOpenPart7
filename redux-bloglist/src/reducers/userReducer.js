import blogService from "../services/blogs";

const userReducer = (state = null, action) => {
  console.log("ACTION:", action);

  switch (action.type) {
    case "INIT_USER": {
      return action.data;
    }
    default:
      return state;
  }
};

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    const user = JSON.parse(loggedUserJSON);
    console.log(user);
    blogService.setToken(user.token);
    dispatch({
      type: "INIT_USER",
      data: user,
    });
  };
};

export default userReducer;

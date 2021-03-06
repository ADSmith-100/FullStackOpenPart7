const userReducer = (state = null, action) => {
  console.log("ACTION:", action);

  switch (action.type) {
    case "INIT_USER": {
      return action.data || null;
    }
    case "CLEAR_USER": {
      return action.data;
    }
    case "INIT_LOGGED": {
      if (!state) {
        return state;
      }
      return action.data;
    }
    default:
      return state;
  }
};

export const initializeUser = (user) => {
  return async (dispatch) => {
    // const user = await loginService.login({ username, password });
    // window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    // blogService.setToken(user.token);

    dispatch({
      type: "INIT_USER",
      data: user,
    });
  };
};

export const clearUser = () => {
  return {
    type: "CLEAR_USER",
    data: null,
  };
};

export const loggedUser = () => {
  return {
    type: "INIT_LOGGED",
  };
};

export default userReducer;

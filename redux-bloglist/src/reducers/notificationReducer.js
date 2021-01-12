const initialState = {
  content: null,
  type: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NOTIFY_REMOVE": {
      return action.data;
    }
    case "SET_NOTIFY": {
      return action.data;
    }

    default:
      return state;
  }
};

export const notifyRemove = (content) => {
  return {
    type: "NOTIFY_REMOVE",
    data: {
      type: "",
      content: null,
    },
  };
};

let timerId;

export const setNotification = (content, time, type) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFY",
      data: { content, type },
    });

    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = await setTimeout(() => {
      dispatch(notifyRemove());
    }, time * 500);
  };
};

export default notificationReducer;

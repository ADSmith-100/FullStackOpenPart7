const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "NOTIFY_REMOVE": {
      return action.data.notification;
    }
    case "SET_NOTIFY": {
      return action.data.notification;
    }

    default:
      return state;
  }
};

export const notifyRemove = (content) => {
  return {
    type: "NOTIFY_REMOVE",
    data: {
      content,
      notification: null,
    },
  };
};

let timerId;

export const setNotification = (content, time, type) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFY",
      data: {
        notification: content,
        type: type,
      },
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

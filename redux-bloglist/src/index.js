import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import blogReducer from "./reducers/blogReducer";

const store = createStore(blogReducer);
store.dispatch({
  type: "NEW_BLOG",
  data: {
    id: 1,
    title: "the app state is in redux store",
    author: "Ben Dover",
    url: "www.suckass.com",
    likes: 69,
  },
});

store.dispatch({
  type: "NEW_BLOG",
  data: {
    id: 2,
    title: "felching",
    author: "Stupid GUY",
    url: "www.suckass.com",
    likes: 2,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

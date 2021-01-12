import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import App from "./App";
import blogReducer from "./reducers/blogReducer";

const reducer = combineReducers({
  blogs: blogReducer,
});

const store = createStore(reducer, composeWithDevTools());

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);

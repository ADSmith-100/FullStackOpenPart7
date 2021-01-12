import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import blogReducer, { createBlog } from "./reducers/blogReducer";

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

const App = () => {
  const addBlog = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";
    store.dispatch(createBlog(title, author, url));
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <input name="author" />
        <input name="title" />
        <input name="url" />
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map((blog) => (
          <li key={blog.id}>
            {blog.title} {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);

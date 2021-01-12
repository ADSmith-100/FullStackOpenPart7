const blogReducer = (state = [], action) => {
  if (action.type === "NEW_BLOG") {
    return [...state, action.data];
  }

  return state;
};

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

export const createBlog = (title, author, url) => {
  return {
    type: "NEW_BLOG",
    data: {
      id: generateId(),
      title,
      author,
      url,
      votes: 0,
    },
  };
};

export default blogReducer;

const initialState = [
  {
    id: 1,
    title: "the app state is in redux store",
    author: "Ben Dover",
    url: "www.suckass.com",
    likes: 69,
  },
  {
    id: 2,
    title: "felching",
    author: "Stupid GUY",
    url: "www.suckass.com",
    likes: 2,
  },
];

const blogReducer = (state = initialState, action) => {
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

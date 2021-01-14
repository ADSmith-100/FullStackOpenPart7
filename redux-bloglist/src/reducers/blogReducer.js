import blogService from "../services/blogs";

// const initialState = [
//   {
//     id: 1,
//     title: "the app state is in redux store",
//     author: "Ben Dover",
//     url: "www.suckass.com",
//     likes: 69,
//   },
//   {
//     id: 2,
//     title: "felching",
//     author: "Stupid GUY",
//     url: "www.suckass.com",
//     likes: 2,
//   },
// ];

const blogReducer = (state = [], action) => {
  console.log("ACTION:", action);

  switch (action.type) {
    case "NEW_BLOG": {
      return [...state, action.data];
    }
    case "INIT_BLOGS": {
      return action.data;
    }
    default:
      return state;
  }
};

// const generateId = () => Number((Math.random() * 1000000).toFixed(0));

export const createBlog = (data) => {
  return {
    type: "NEW_BLOG",
    data,
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export default blogReducer;

import blogReducer from "./blogReducer";
import deepFreeze from "deep-freeze";

describe("blogReducer", () => {
  test("returns new state with action NEW_BLOG", () => {
    const state = [];
    const action = {
      type: "NEW_BLOG",
      data: {
        id: 11,
        title: "the app state is in redux store",
        author: "Ben Dover",
        url: "www.suckass.com",
        likes: 69,
      },
    };

    deepFreeze(state);
    const newState = blogReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.data);
  });
});

const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id,
    likes: body.likes || 0,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const token = getTokenFrom(request);
  const blog = await Blog.findById(request.params.id);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  } else if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    return response
      .status(401)
      .json({ error: "blogs can only be deleted by user that posted them!" });
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate("comments", { content: 1 });
  response.status(200);
  response.json(updatedBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const id = request.params.id;
  const comment = request.body.comment;

  try {
    const blog = await Blog.findById(id);
    if (blog) {
      if (Array.isArray(blog.comments)) {
        blog.comments.push(comment);
      } else {
        blog.comments = [comment];
      }

      const newBlog = await blog.save();

      const fullBlog = await Blog.populate(newBlog, {
        path: "user",
      });

      response.status(200).json(fullBlog);
    } else {
      response.status(400).json({
        error: `No blog with the following id: ${id}`,
      });
    }
    const udatedBlog = await Blog.findByIdAndUpdate(id, blog, {
      new: true,
    }).populate("user");
  } catch (err) {
    response.status(400).json({
      error: err.message,
    });
  }
});

module.exports = blogsRouter;

//something to do with how the backend is returning the saved blog.  It only sends the user id.  Need the user.name to populate the user name thing.
//It only populates with the uesr name after a refresh when the database ref adds the user object into it.

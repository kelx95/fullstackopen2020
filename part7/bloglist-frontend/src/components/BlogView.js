import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { likeBlog } from "../reducers/blogsReducer";
import { useField } from "../hooks/index";
import { addComment } from "../reducers/blogsReducer"

const BlogView = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch("/blogs/:id");
  const blogs = useSelector((state) => state.blogs);
  const comment = useField("text", "comment", "comment");

  const blog = match
    ? blogs.find((blog) => blog.id === String(match.params.id))
    : null;

  const handleAddNewComment = (event) => {
    dispatch(
      addComment(comment.value, blog.id)
    );
    comment.onReset();
  };

  if (!blog) return null;

  return (
    <div>
      <br />
      <h2>{blog.title}</h2>
      <br />
      <a target="_blank" rel="noopener noreferrer" href={blog.url}>
        {blog.url}
      </a>
      <div>
        <p style={{ display: "inline" }}>{`${blog.likes} likes`}</p>
        &nbsp;<button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </div>
      <p>{`added by ${blog.author}`}</p>
      <h3>comments</h3>
      <input {...comment} />
      <button onClick={() => handleAddNewComment()}>comment</button>
      <br />
      <ol>
        {blog.comments.map((comment) => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ol>
    </div>
  );
};

export default BlogView;

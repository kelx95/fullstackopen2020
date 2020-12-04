import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { likeBlog } from "../reducers/blogsReducer";
import { useField } from "../hooks/index";
import { addComment } from "../reducers/blogsReducer";
import { Card, Button, ListGroup, ListGroupItem, Form } from "react-bootstrap";

const BlogView = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch("/blogs/:id");
  const blogs = useSelector((state) => state.blogs);
  const comment = useField("text", "comment", "comment");

  const blog = match
    ? blogs.find((blog) => blog.id === String(match.params.id))
    : null;

  const handleAddNewComment = (event) => {
    dispatch(addComment(comment.value, blog.id));
    comment.onReset();
  };

  if (!blog) return null;

  return (
    <div>
      <Card style={{ width: "100%" }} className="container">
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {`added by ${blog.author}`}
          </Card.Subtitle>
          <Card.Link target="_blank" rel="noopener noreferrer" href={blog.url}>
            {blog.url}
          </Card.Link>
          <Card.Title>{`${blog.likes} likes`}</Card.Title>
          <Button variant="primary" onClick={() => dispatch(likeBlog(blog))}>
            Like
          </Button>
          <br />

          <Form.Group>
            <Form.Label style={{ marginTop: "10px" }}>
              Add new comment
            </Form.Label>
            <Form.Control as="textarea" rows={3} {...comment} />
            <Button
              variant="primary"
              style={{ marginTop: "5px" }}
              onClick={() => handleAddNewComment()}
            >
              Add Comment
            </Button>
          </Form.Group>

          <ListGroup className="list-group-flush">
            <Form.Label style={{ marginTop: "10px" }}>Comments</Form.Label>
            {blog.comments.map((comment) => (
              <ListGroupItem key={comment._id}>{comment.content}</ListGroupItem>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BlogView;

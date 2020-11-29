import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Toggable from "./components/Toggable";

import { initializeBlogs } from "./reducers/blogsReducer";
import { logOut, loggedIn } from "./reducers/userReducer";
import LoginForm from "./components/LoginForm";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  const hideForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch(loggedIn(user));
    }
  }, [dispatch]);

  return (
    <div>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          {`${user.name} logged in `}
          <button onClick={() => dispatch(logOut())}>logout</button>
          <br />
          <br />
          <Toggable buttonLabel="create new" ref={blogFormRef}>
            <BlogForm hideForm={hideForm} />
          </Toggable>
          <br />
          <div className="blogs-section">
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

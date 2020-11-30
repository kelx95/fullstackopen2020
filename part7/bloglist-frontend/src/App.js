import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Toggable from "./components/Toggable";

import { initializeBlogs } from "./reducers/blogsReducer";
import { logOut, loggedIn } from "./reducers/userReducer";
import LoginForm from "./components/LoginForm";
import {
  Switch, Route
} from "react-router-dom"
import Users from './components/Users'

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

  const userLogged = () => <div>
    <h1>blogs</h1>
    {user && `${user.name} logged in `}
    <button onClick={() => dispatch(logOut())}>logout</button>
  </div>

  return (
    <Switch>
      <Route path="/" exact>
        <div>
          {(user === null) ? (
            <div>
              <h2>Log in to application</h2>
              <Notification />
              <LoginForm />
            </div>
          ) : (
            <div>
              <Notification />
              {userLogged()}
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
      </Route>
      <Route path="/users" exact>
      <div>
        {userLogged()}
        <Users />
      </div> 
      </Route>
      <Route path="/test" exact>
      </Route>
    </Switch>
  );
};

export default App;

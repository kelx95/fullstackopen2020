import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Toggable from "./components/Toggable";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { loggedIn } from "./reducers/userReducer";
import LoginForm from "./components/LoginForm";
import { Switch, Route, Link } from "react-router-dom";
import Users from "./components/Users";
import UserView from "./components/UsersView";
import BlogView from "./components/BlogView";
import NavBar from "./components/NavBar"

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  const hideForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
      dispatch(initializeUsers());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch(loggedIn(user));
    }
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <div>
            {user === null ? (
              <div>
                <h2>Log in to application</h2>
                <Notification />
                <LoginForm />
              </div>
            ) : (
              <div>
                <Notification />
                <br />
                <Toggable buttonLabel="create new" ref={blogFormRef}>
                  <BlogForm hideForm={hideForm} />
                </Toggable>
                <div className="blogs-section">
                  {blogs.map((blog) => (
                    <Link to={`blogs/${blog.id}`} key={blog.id}>
                      <Blog key={blog.id} blog={blog} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Route>
        <Route path="/users" exact>
          <div>
            <Users />
          </div>
        </Route>
        <Route path="/users/:id" exact>
          <UserView />
        </Route>
        <Route path="/blogs/:id" exact>
          <BlogView />
        </Route>
      </Switch>
    </div>
  );
};

export default App;

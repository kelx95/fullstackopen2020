import React from "react";
import {useField} from "../hooks/index";
import { useDispatch } from "react-redux";
import { logIn } from "../reducers/userReducer";

const LoginForm = () => {
  const dispatch = useDispatch();
  const username = useField("text", "username", "username");
  const password = useField("password", "password", "password");

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = { 
        username: username.value, 
        password: password.value 
    };
    dispatch(logIn(user));
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <input {...username} />
        </div>
        <div>
          <input {...password} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

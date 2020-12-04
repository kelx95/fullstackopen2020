import React from "react";
import {useField} from "../hooks/index";
import { useDispatch } from "react-redux";
import Notification from "../components/Notification"
import { logIn } from "../reducers/userReducer";
import { Table, Form, Button } from 'react-bootstrap'

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
    <div className="container">
    <h2 style={{marginTop: '25px'}}>Log in to application</h2>
      <Notification /> 
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            {...username}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            {...password}
          />
          <Button variant="primary" type="submit" style={{marginTop: '10px'}}>
          login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;

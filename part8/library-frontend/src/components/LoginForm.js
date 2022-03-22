import { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { LOGIN, LOGGED_USER } from "../queries";

const LoginForm = ({ setUser, show }) => {
  const [getUserData] = useLazyQuery(LOGGED_USER);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN);

  const getUser = async () => {
    const user = await getUserData();
    if (user?.data?.me) setUser(user.data.me);
  };

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      getUser();
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]); // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  if (!show) return null;

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;

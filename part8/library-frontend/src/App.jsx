import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import RecommendBooks from "./components/RecommendBooks";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const handleLogOut = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={handleLogOut}>logout</button>
          </>
        ) : (
          <>
            <button onClick={() => setPage("login")}>login</button>
            <LoginForm setToken={setToken} show={page === "login"} />
          </>
        )}
      </div>
      <Authors show={page === "authors"} token={token}/>
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <RecommendBooks show={page === "recommend"} />
    </div>
  );
};

export default App;

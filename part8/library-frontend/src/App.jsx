import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import RecommendBooks from "./components/RecommendBooks";
import { useApolloClient, useSubscription, useLazyQuery } from "@apollo/client";
import { BOOK_ADDED, LOGGED_USER } from "./queries";
import { updateCacheAllBooksQuery } from "./components/NewBook";

const App = () => {
  const [getUserData] = useLazyQuery(LOGGED_USER);
  const [page, setPage] = useState("authors");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [user, setUser] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      notify("New book added");
      updateCacheAllBooksQuery(client.cache, subscriptionData?.data?.bookAdded);
    },
  });

  const handleLogOut = () => {
    setUser(null);
    localStorage.clear();
    client.resetStore();
    if (page === "add" || page === "recommend") {
      setPage("authors");
    }
  };

  const getUser = async () => {
    const tokenFromLocalStorage = localStorage.getItem("library-user-token");
    if (tokenFromLocalStorage) {
      const user = await getUserData();
      if (user?.data?.me) setUser(user.data.me);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const showPage = () => {
    switch (page) {
      case "authors":
        return <Authors user={user} />;
      case "books":
        return <Books />;
      case "add":
        return <NewBook />;
      case "recommend":
        return <RecommendBooks user={user} />;
      default:
        break;
    }
  };

  const Notify = ({ message }) => {
    if (!message) {
      return null;
    }
    return (
      <div
        style={{
          color: "red",
          border: "1px solid red",
          padding: "25px",
          margin: "20px",
        }}
      >
        {message}
      </div>
    );
  };

  const notify = (message) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 10000);
  };

  return (
    <>
      <button onClick={() => setPage("authors")}>authors</button>
      <button onClick={() => setPage("books")}>books</button>
      {user ? (
        <>
          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => setPage("recommend")}>recommend</button>
          <button onClick={handleLogOut}>logout</button>
        </>
      ) : (
        <>
          <button onClick={() => setPage("login")}>login</button>
          <LoginForm setUser={setUser} show={page === "login"} />
        </>
      )}
      <Notify message={notificationMessage} />
      {showPage()}
    </>
  );
};

export default App;

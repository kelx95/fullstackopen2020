import { useQuery } from "@apollo/client";
import { ALL_BOOKS, LOGGED_USER } from "../queries";

const RecommendBooks = ({ show }) => {
  const user = useQuery(LOGGED_USER);
  const { loading, data } = useQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        {`books in your favorite genre `}
        <span style={{ fontWeight: "bold" }}>
          {user?.data?.me?.favoriteGenre}
        </span>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data?.allBooks
            .filter((book) =>
              book?.genres?.includes(user?.data?.me?.favoriteGenre)
            )
            .map(({ title, author, published }) => (
              <tr key={title}>
                <td>{title}</td>
                <td>{author}</td>
                <td>{published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecommendBooks;

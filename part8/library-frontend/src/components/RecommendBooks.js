import { useQuery } from "@apollo/client";
import { ALL_BOOKS, LOGGED_USER } from "../queries";

const RecommendBooks = ({ token }) => {
  const user = useQuery(LOGGED_USER, {
    skip: !token,
  });

  const { loading, data } = useQuery(ALL_BOOKS, {
    variables: {
      genre: user?.data?.me?.favoriteGenre,
    },
  });
  
  if (loading || user?.loading || !user?.data?.me) {
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
          {data?.allBooks.map(({ title, author, published }) => (
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

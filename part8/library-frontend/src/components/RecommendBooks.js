import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const RecommendBooks = ({ user }) => {
  const { data, loading } = useQuery(ALL_BOOKS, {
    variables: {
      genre: user?.favoriteGenre,
    },
    skip: !user,
  });

  if (loading || !user) {
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
          {data?.allBooks?.map(({ title, author, published }) => (
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

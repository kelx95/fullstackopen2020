import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import EditAuthorBirth from "./EditAuthorBirth";

const Authors = ({ user }) => {
  const { loading, data } = useQuery(ALL_AUTHORS, {
    fetchPolicy: "cache-and-network"
  });

  if (loading || !data) {
    return <div>loading....</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data?.allAuthors?.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {user && (
        <EditAuthorBirth
          authors={data?.allAuthors?.map((a) => ({
            value: a.name,
            label: a.name,
          }))}
        />
      )}
    </div>
  );
};

export default Authors;

import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const { loading, data } = useQuery(ALL_BOOKS);
  const ALL_GENRES = "all";
  const [genre, setGenre] = useState(ALL_GENRES);
  let genres = [];

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (data?.allBooks?.length > 0) {
    data.allBooks.forEach((book) => {
      if (book?.genres?.length > 0) {
        book.genres.forEach((genre) => genres.push(genre));
      }
    });
    genres = [...new Set(genres)];
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        {`in genre `}
        <span style={{ fontWeight: "bold" }}>{genre}</span>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data?.allBooks
            ?.filter((book) => {
              if (genre !== ALL_GENRES) {
                return book.genres.includes(genre);
              } else {
                return book;
              }
            })
            .map(({ title, author, published }) => (
              <tr key={title}>
                <td>{title}</td>
                <td>{author}</td>
                <td>{published}</td>
              </tr>
            ))}
          {genres?.map((genre) => (
            <button onClick={() => setGenre(genre)}>{genre}</button>
          ))}
          <button onClick={() => setGenre(ALL_GENRES)}>all genres</button>
        </tbody>
      </table>
    </div>
  );
};

export default Books;

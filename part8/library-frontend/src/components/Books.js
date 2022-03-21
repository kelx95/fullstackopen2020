import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState, useEffect } from "react";

const Books = () => {
  const [genres, setGenres] = useState([]);
  const ALL_GENRES = "all";
  const [genre, setGenre] = useState(ALL_GENRES);
  const booksFilteredByGenre = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
  });

  useEffect(() => {
    if (genre === ALL_GENRES) {
      const tempGenres = [];
      if (booksFilteredByGenre?.data?.allBooks?.length > 0) {
        booksFilteredByGenre?.data.allBooks.forEach((book) => {
          if (book?.genres?.length > 0) {
            book.genres.forEach((genre) => tempGenres.push(genre));
          }
        });
        setGenres([...new Set(tempGenres)]);
      }
    }
  }, [booksFilteredByGenre?.data?.allBooks, genre]);

  if (booksFilteredByGenre?.loading) {
    return <div>loading...</div>;
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
          {booksFilteredByGenre?.data?.allBooks.map(
            ({ title, author, published }) => (
              <tr key={title}>
                <td>{title}</td>
                <td>{author}</td>
                <td>{published}</td>
              </tr>
            )
          )}
          <tr>
            <td>
              {genres?.map((genre) => (
                <button onClick={() => setGenre(genre)} key={genre}>
                  {genre}
                </button>
              ))}
              <button onClick={() => setGenre(ALL_GENRES)} key={ALL_GENRES}>
                all genres
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Books;

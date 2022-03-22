import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK, ALL_BOOKS } from "../queries";

export const updateCacheAllBooksQuery = (cache, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };
  cache.updateQuery(
    {
      query: ALL_BOOKS,
      variables: {
        genre: "all",
      },
    },
    ({ allBooks }) => {
      return {
        allBooks: uniqByName(allBooks.concat(addedBook)),
      };
    }
  );
  if (addedBook?.genres?.length > 0) {
    for (const genre of addedBook.genres) {
      cache.updateQuery(
        {
          query: ALL_BOOKS,
          variables: {
            genre: genre,
          },
        },
        ({ allBooks }) => {
          return {
            allBooks: uniqByName(allBooks.concat(addedBook)),
          };
        }
      );
    }
  }
};

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      console.log(error);
    },
    update: (cache, response) => {
      updateCacheAllBooksQuery(cache, response.data.addBook);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    createBook({
      variables: { title, author, published: parseInt(published, 10), genres }
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;

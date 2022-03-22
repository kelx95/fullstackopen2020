const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const Author = require("./models/Author");
const Book = require("./models/Book");
const User = require("./models/User");
const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && !args.genre) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          const books = await Book.find({ author: author._id }).populate(
            "author",
            { name: 1 }
          );
          return books.map((book) => ({
            title: book.title,
            author: book.author.name,
            published: book.published,
            genres: book.genres,
            id: book._id,
          }));
        }
      } else if (!args.author && args.genre) {
        let books = null;
        if (args.genre === "all") {
          books = await Book.find({}).populate("author", { name: 1 });
        } else {
          books = await Book.find({
            genres: { $in: [args.genre] },
          }).populate("author", { name: 1 });
        }
        return books.map((book) => ({
          title: book.title,
          author: book.author.name,
          published: book.published,
          genres: book.genres,
          id: book._id,
        }));
      } else if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          const books = await Book.find({
            author: author._id,
            genres: { $in: [args.genre] },
          }).populate("author", { name: 1 });
          return books.map((book) => ({
            title: book.title,
            author: book.author.name,
            published: book.published,
            genres: book.genres,
            id: book._id,
          }));
        }
      } else {
        const books = await Book.find({}).populate("author", { name: 1 });
        return books.map((book) => ({
          title: book.title,
          author: book.author.name,
          published: book.published,
          genres: book.genres,
          id: book._id,
        }));
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({}).populate("books", {
        _id: 1,
        title: 1,
        published: 1,
        author: 1,
        genres: 1,
      });
      const mappedAuthors = authors.map((author) => ({
        id: author._id,
        name: author.name,
        born: author?.born ?? null,
        bookCount: author?.books?.length ?? 0,
        books: author?.books,
      }));
      return mappedAuthors;
    },
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const createBook = async (title, published, author, genres) => {
        const book = new Book({
          title: title,
          author: author._id,
        });
        if (published) {
          book.published = published;
        }
        if (genres) {
          book.genres = genres;
        }
        try {
          const { title, published, genres, _id } = await book.save();
          author.books = author.books.concat(_id);
          await author.save();
          const newBook = {
            title,
            author: author?.name,
            published,
            genres,
            id: _id,
          };
          pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
          return newBook;
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      };

      const createAuthor = async (name) => {
        const author = new Author({
          name,
        });
        try {
          const savedAuthor = await author.save();
          return savedAuthor;
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      };

      if (args.title) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          return await createBook(
            args.title,
            args.published,
            author,
            args.genres
          );
        } else {
          const author = await createAuthor(args.author);
          return await createBook(
            args.title,
            args.published,
            author,
            args.genres
          );
        }
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      if (args.name && args.setBornTo) {
        const author = await Author.findOne({ name: args.name });
        if (author) {
          author.born = parseInt(args.setBornTo, 10);
          try {
            await author.save();
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            });
          }
        }
        return author;
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return {
        value: jwt.sign(userForToken, JWT_SECRET),
      };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;

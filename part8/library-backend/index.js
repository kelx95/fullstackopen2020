const { ApolloServer, gql, UserInputError } = require("apollo-server");
const mongoose = require("mongoose");
const Author = require("./models/Author");
const Book = require("./models/Book");
/* eslint-disable no-undef */
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String]
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

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
        const books = await Book.find({
          genres: { $in: [args.genre] },
        }).populate("author", { name: 1 });

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
    allAuthors: async () => await Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate("author", { name: 1 });
      const bookCount = books.filter(
        (book) => book.author.name === root.name
      ).length;
      return bookCount;
    },
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
          author: author,
        });
        if (published) {
          book.published = published;
        }
        if (genres) {
          book.genres = genres;
        }
        try {
          const savedBook = await book.save();
          const { title, author, published, genres, _id } = await Book.findById(savedBook._id).populate("author", { name: 1 });
          const newBook = {
            title,
            author: author?.name,
            published,
            genres,
            id: _id,
          }
          return newBook
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
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
        return author;
      };

      if (args.title) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          return await createBook(args.title, args.published, author._id, args.genres);
        } else {
          const author = await createAuthor(args.author);
          return await createBook(args.title, args.published, author._id, args.genres);
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLocaleLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return {
        currentUser,
      };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

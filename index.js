const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const books = [
    {
        title: 'The awakening',
        author: 'kate williams'
    },
    {
        title: 'City of glass',
        author: 'david cameron'
    }
];

const typeDefs = gql`
    type Book {
        title: String,
        author: String
    }

    type Query {
        books: [Book]
    }
`;

const resolvers = {
    Query: {
        books: () => books
    }
};

async function startApolloServer () {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    await server.start();

    const app = express();
    server.applyMiddleware({ app, path: '/books' });
    await new Promise(resolve => app.listen({ port: 4000 }, resolve));
    console.log('Server running on http://localhost:4000' + server.graphqlPath);
    return { server, app }
};

startApolloServer();
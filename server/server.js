const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const PlaceholderAPI = require('./datasources/placeholder');

const startApolloServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		dataSources: () => ({ placeholderAPI: new PlaceholderAPI() }),
	});
	await server.start();

	const app = express();
	server.applyMiddleware({ app });

	await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
	console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);

	return { server, app };
};

startApolloServer();

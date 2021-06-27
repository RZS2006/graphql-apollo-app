const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const DataLoader = require('dataloader');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const PlaceholderAPI = require('./datasources/placeholder');

const startApolloServer = async () => {
	const placeholderAPI = new PlaceholderAPI();

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: () => {
			return {
				userLoader: new DataLoader(async (keys) => {
					const users = await placeholderAPI.getAllUsers();

					const userMap = {};
					users.forEach((u) => {
						userMap[u.id] = u;
					});
					return keys.map((key) => userMap[key]);
				}),
			};
		},
		dataSources: () => ({ placeholderAPI }),
	});
	await server.start();

	const app = express();
	server.applyMiddleware({ app });

	await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
	console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);

	return { server, app };
};

startApolloServer();

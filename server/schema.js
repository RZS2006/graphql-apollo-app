const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Post {
		id: Int!
		title: String
		body: String
		userId: Int
	}

	type User {
		id: Int!
		name: String
		username: String
		email: String
		phone: String
		website: String
	}

	type Query {
		getPosts: [Post]!
		getPostById(id: Int): Post
		getUsers: [User]!
		getUserById: User!

		hello: String
		number: Int
	}

	type Mutation {
		createPost(input: CreatePostInput): Post
		deletePost(id: Int!): [Post]!
	}

	input CreatePostInput {
		title: String
		body: String
	}
`;

module.exports = typeDefs;

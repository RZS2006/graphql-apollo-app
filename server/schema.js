const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Post {
		id: Int!
		title: String
		body: String
		userId: Int
		user: User
	}

	type User {
		id: Int!
		name: String
		username: String
		email: String
		phone: String
		website: String
		posts: [Post]
	}

	type Query {
		getPosts: [Post]!
		getPostById(id: Int!): Post!
		getUsers: [User]!
		getUserById(id: Int!): User!
	}

	type Mutation {
		createPost(input: CreatePostInput!): Post
		deletePost(id: Int!): [Post]!
	}

	input CreatePostInput {
		title: String
		body: String
	}
`;

module.exports = typeDefs;

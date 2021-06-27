module.exports = {
	Post: {
		user: ({ userId }, __, { dataSources }) =>
			dataSources.placeholderAPI.getUserById({ userId }),
	},
	User: {
		posts: async ({ id }, __, { dataSources }) => {
			const posts = await dataSources.placeholderAPI.getAllPosts();
			return posts.filter((p) => p.userId === id);
		},
	},
	Query: {
		getPosts: (_, __, { dataSources }) =>
			dataSources.placeholderAPI.getAllPosts(),
		getPostById: (_, { id }, { dataSources }) =>
			dataSources.placeholderAPI.getPostById({ postId: id }),
		getUsers: (_, __, { dataSources }) =>
			dataSources.placeholderAPI.getAllUsers(),
		getUserById: (_, { id }, { dataSources }) =>
			dataSources.placeholderAPI.getUserById({ userId: id }),
	},
	Mutation: {
		createPost: (_, { input: post }, { dataSources }) => {
			return dataSources.placeholderAPI.createPost(
				JSON.parse(JSON.stringify(post))
			);
		},
		deletePost: async (_, { id }, { dataSources }) => {
			dataSources.placeholderAPI.deletePost({ postId: id });

			const posts = await dataSources.placeholderAPI.getAllPosts();
			return posts.filter((p) => p.id !== id);
		},
	},
};

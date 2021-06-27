module.exports = {
	Query: {
		getPosts: (_, __, { dataSources }) =>
			dataSources.placeholderAPI.getAllPosts(),
		getPostById: (_, { id }, { dataSources }) =>
			dataSources.placeholderAPI.getPostById({ postId: id }),
		getUsers: (_, __, { dataSources }) =>
			dataSources.placeholderAPI.getAllUsers(),
		getUserById: (_, { id }, { dataSources }) =>
			dataSources.placeholderAPI.getUserById({ userId: id }),
		hello: () => 'Hello world!',
		number: () => 5,
	},
};

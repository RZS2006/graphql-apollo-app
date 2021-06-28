const { RESTDataSource } = require('apollo-datasource-rest');

class PlaceholderAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = 'https://jsonplaceholder.typicode.com/';
	}

	async getAllPosts() {
		return await this.get('posts');
	}

	async getPostById({ postId }) {
		return await this.get(`posts/${postId}`);
	}

	async getPostsByUserId({ userId }) {
		return await this.get(`users/${userId}/posts`);
	}

	async createPost(post) {
		return await this.post('posts', post);
	}

	async deletePost({ postId }) {
		return await this.delete(`posts/${postId}`);
	}

	async getAllUsers() {
		return await this.get('users');
	}

	async getUserById({ userId }) {
		return await this.get(`users/${userId}`);
	}
}

module.exports = PlaceholderAPI;

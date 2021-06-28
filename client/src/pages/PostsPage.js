import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import Loading from '../components/Loading';
import Error from '../components/Error';

const GET_POSTS = gql`
	query GetPosts {
		getPosts {
			id
			title
			body
		}
	}
`;

const PostsPage = () => {
	const { loading, error, data } = useQuery(GET_POSTS);

	if (loading) return <Loading />;
	if (error) return <Error />;

	const { getPosts: posts } = data;

	return (
		<div>
			<div className="container">
				<h1>Posts</h1>
				{posts.map((post) => (
					<div key={post.id}>
						<h2>{post.title}</h2>
						<p>{post.body}</p>
						<Link to={`/posts/${post.id}`}>View Full</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default PostsPage;

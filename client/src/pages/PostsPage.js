import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
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

const DELETE_POST = gql`
	mutation DeletePost($id: Int!) {
		deletePost(id: $id) {
			id
			title
			body
		}
	}
`;

const PostsPage = () => {
	const { loading, error, data } = useQuery(GET_POSTS);
	const [deletePost] = useMutation(DELETE_POST, {
		onCompleted: (data) => setPosts(data.deletePost),
	});

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (!loading && !error && data) {
			setPosts(data.getPosts);
		}
	}, [loading, error, data]);

	const onDeletePost = (id) => {
		deletePost({ variables: { id } });
	};

	if (loading) return <Loading />;
	if (error) return <Error />;

	return (
		<div>
			<div className="container">
				<h1>Posts</h1>
				{posts.map((post) => (
					<div key={post.id}>
						<h2>
							{post.id} - {post.title}
						</h2>
						<p>{post.body}</p>
						<Link to={`/posts/${post.id}`}>View Full</Link>
						<button onClick={() => onDeletePost(post.id)}>
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default PostsPage;

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

const CREATE_POST = gql`
	mutation CreatePost($input: CreatePostInput!) {
		createPost(input: $input) {
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
	const [createPost] = useMutation(CREATE_POST, {
		onCompleted: (data) => {
			const newPost = { ...data.createPost, custom: true };
			setPosts([newPost, ...posts]);
		},
	});

	const [posts, setPosts] = useState([]);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	useEffect(() => {
		if (!loading && !error && data) {
			setPosts(data.getPosts);
		}
	}, [loading, error, data]);

	const onFormSubmit = (e) => {
		e.preventDefault();

		if (title.trim().length > 1 && body.trim().length > 1) {
			createPost({ variables: { input: { title, body } } });
		}

		setTitle('');
		setBody('');
	};

	const onDeletePost = (id) => {
		deletePost({ variables: { id } });
	};

	if (loading) return <Loading />;
	if (error) return <Error />;

	return (
		<div>
			<div className="container">
				<h1>Posts</h1>
				<form onSubmit={(e) => onFormSubmit(e)}>
					<fieldset className="fieldset">
						<legend>Create Post</legend>
						<label htmlFor="title" className="form-element">
							Title
						</label>
						<input
							type="text"
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="form-element"
						/>
						<label htmlFor="body" className="form-element">
							Body
						</label>
						<textarea
							id="body"
							value={body}
							onChange={(e) => setBody(e.target.value)}
							className="form-element"></textarea>
						<button type="submit">Submit</button>
					</fieldset>
				</form>
				<p>{posts.length} result(s)</p>
				{posts.map((post) => (
					<div key={post.id}>
						<h2>
							{post.id} - {post.title}
						</h2>
						<p>{post.body}</p>
						{!post.custom && (
							<Link to={`/posts/${post.id}`}>View Full</Link>
						)}
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

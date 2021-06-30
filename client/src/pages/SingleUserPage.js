import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';

import Loading from '../components/Loading';
import Error from '../components/Error';

const GET_USER = gql`
	query GetUser($id: Int!) {
		getUserById(id: $id) {
			name
			username
			email
			phone
			website
			posts {
				id
				title
				body
			}
		}
	}
`;

const SingleUserPage = () => {
	const { id } = useParams();

	const { loading, error, data } = useQuery(GET_USER, {
		variables: { id: parseInt(id) },
	});

	if (loading) return <Loading />;
	if (error) return <Error />;

	const { getUserById: user } = data;

	return (
		<div>
			<div className="container">
				<h1>{user.name}</h1>
				<p>Username: @{user.username}</p>
				<p>Email: {user.email}</p>
				<p>Phone: {user.phone}</p>
				<p>Website: {user.website}</p>
				<h2 className="section-title">
					User Posts ({user.posts.length})
				</h2>
				{user.posts.map((post) => (
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

export default SingleUserPage;

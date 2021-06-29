import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';

import Loading from '../components/Loading';
import Error from '../components/Error';

const GET_POST = gql`
	query GetPost($id: Int!) {
		getPostById(id: $id) {
			title
			body
			userId
			user {
				name
			}
		}
	}
`;

const SinglePostPage = () => {
	const { id } = useParams();

	const { loading, error, data } = useQuery(GET_POST, {
		variables: { id: parseInt(id) },
	});

	if (loading) return <Loading />;
	if (error) return <Error />;

	const { getPostById: post } = data;

	return (
		<div>
			<div className="container">
				<h1>{post.title}</h1>
				<p>
					By{' '}
					<Link to={`/users/${post.userId}`}>{post.user.name}</Link>
				</p>
				<p>{post.body}</p>
			</div>
		</div>
	);
};

export default SinglePostPage;

import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import Loading from '../components/Loading';
import Error from '../components/Error';

const GET_USERS = gql`
	query GetUsers {
		getUsers {
			id
			name
		}
	}
`;

const UsersPage = () => {
	const { loading, error, data } = useQuery(GET_USERS);

	if (loading) return <Loading />;
	if (error) return <Error />;

	const { getUsers: users } = data;

	return (
		<div>
			<div className="container">
				<h1>Users</h1>
				<p>{users.length} result(s)</p>
				{users.map((user) => (
					<div key={user.id}>
						<h2>{user.name}</h2>
						<Link to={`/users/${user.id}`}>View Profile</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default UsersPage;

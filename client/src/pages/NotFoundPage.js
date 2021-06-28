import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
	return (
		<div>
			<div className="container">
				<h1>404</h1>
				<h2>That page was not found</h2>
				<Link to="/posts">Return to home page</Link>
			</div>
		</div>
	);
};

export default NotFoundPage;

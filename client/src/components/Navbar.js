import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav>
			<div className="container">
				<Link to="/posts">Posts</Link>
				<Link to="/users">Users</Link>
			</div>
		</nav>
	);
};

export default Navbar;

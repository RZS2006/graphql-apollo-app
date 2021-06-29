import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="nav">
			<div className="container">
				<Link to="/posts" className="nav-link">
					Posts
				</Link>
				<Link to="/users" className="nav-link">
					Users
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;

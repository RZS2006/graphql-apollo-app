import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import PostsPage from './pages/PostsPage';
import SinglePostPage from './pages/SinglePostPage';
import UsersPage from './pages/UsersPage';
import SingleUserPage from './pages/SingleUserPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
	return (
		<Router>
			<Navbar />
			<main>
				<Switch>
					<Route exact path="/">
						<Redirect to="/posts" />
					</Route>
					<Route path="/users/:id" component={SingleUserPage} />
					<Route path="/posts/:id" component={SinglePostPage} />
					<Route path="/users" component={UsersPage} />
					<Route path="/posts" component={PostsPage} />
					<Route path="*" component={NotFoundPage} />
				</Switch>
			</main>
		</Router>
	);
};

export default App;

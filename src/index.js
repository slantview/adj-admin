import React from 'react';
import ReactDOM from 'react-dom';
import Login from './pages/LoginPage';
import store from './state/store.js';
import { Provider } from 'react-redux';
import { 
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import Layout from './containers/Layout';
import RegistrationPage from './pages/RegistrationPage';
import Homepage from './pages/Homepage';
import SeriesListPage from './pages/SeriesListPage';
import SeriesAddPage from './pages/SeriesAddPage';
import EventsListPage from './pages/EventsListPage';
import EventsAddPage from './pages/EventsAddPage';
import TournamentsListPage from './pages/TournamentsListPage';
import TournamentsAddPage from './pages/TournamentsAddPage';
import GamesListPage from './pages/GamesListPage';
import GamesAddPage from './pages/GamesAddPage';
import PlacesListPage from './pages/PlacesListPage';
import PlacesAddPage from './pages/PlacesAddPage';

ReactDOM.render(
	<Auth0Provider
		domain="auth.beacons.gg"
		clientId="5a60Q09trbb4M21W00AlVHAgrkQmoMip"
		redirectUri={window.location.origin}
		advancedOptions={{
			defaultScope: 'openid profile email read:current_user'
		  }}
		scope='openid profile email read:current_user'
	>
		<Router>
			<Provider store={store}>
				<Switch>
					
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/register">
						<RegistrationPage />
					</Route>
					<Route path="/">
						<Layout>
							<Route exact path="/">
								<Homepage />
							</Route>
							{/* Series Pages */}
							<Route exact path="/series"><SeriesListPage /></Route>
							<Route exact path="/series/add"><SeriesAddPage /></Route>
							{/* Events Pages */}
							<Route exact path="/events"><EventsListPage /></Route>
							<Route exact path="/events/add"><EventsAddPage /></Route>
							{/* <Route exact path="/events/template"><EventsTemplateListPage /></Route>
							<Route exact path="/events/template/add"><EventsTemplateAddPage /></Route> */}
							{/* Tournaments Pages */}
							<Route exact path="/tournaments"><TournamentsListPage /></Route>
							<Route exact path="/tournaments/add"><TournamentsAddPage /></Route>
							{/* <Route exact path="/tournaments/template"><TournamentsTemplateListPage /></Route>
							<Route exact path="/tournaments/template/add"><TournamentsTemplateAddPage /></Route> */}
							{/* Games Pages */}
							<Route exact path="/games"><GamesListPage /></Route>
							<Route exact path="/games/add"><GamesAddPage /></Route>
							{/* Places Pages */}
							<Route exact path="/places"><PlacesListPage /></Route>
							<Route exact path="/places/add"><PlacesAddPage /></Route>
						</Layout>
					</Route>
					<Redirect path="/logout" to="/login" />
					<Redirect to="/" />
				</Switch>
			</Provider>
		</Router>
	</Auth0Provider>
, document.getElementById('root'));

reportWebVitals();

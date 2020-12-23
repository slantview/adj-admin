import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './pages/LoginPage';
import store from './state/store.js';
import { Provider } from 'react-redux';
import { 
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/graphql';
import reportWebVitals from './reportWebVitals';
import UserProvider from './providers/UserProvider';
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
import RecoverPage from './pages/RecoverPage';

ReactDOM.render(
	<UserProvider>
		<Router>
			<Provider store={store}>
				<Switch>
					<Route exact path="/login"><LoginPage /></Route>
					<Route exact path="/register"><RegistrationPage /></Route>
					<Route exact path="/recover"><RecoverPage /></Route>
					<Route path="/">
						<ApolloProvider client={client}>
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
						</ApolloProvider>
					</Route>
					<Redirect path="/logout" to="/login" />
					<Redirect to="/" />
				</Switch>
			</Provider>
		</Router>
	</UserProvider>
, document.getElementById('root'));

reportWebVitals();

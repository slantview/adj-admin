import SiteAddPage from 'pages/Admin/SiteAddPage';
import NotificationProvider from 'providers/NotificationProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import OrganizationAddForm from './components/OrganizationAddForm';
import Layout from './containers/Layout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminOrganizationListPage from './pages/Admin/OrganizationListPage';
import SiteListPage from './pages/Admin/SiteListPage';
import AdminUsersAddPage from './pages/Admin/UsersAddPage';
import AdminUsersListPage from './pages/Admin/UsersListPage';
import EventsAddPage from './pages/EventsAddPage';
import GamesAddPage from './pages/GamesAddPage';
import GamesListPage from './pages/GamesListPage';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import MyAccountPage from './pages/MyAccountPage';
import PlacesAddPage from './pages/PlacesAddPage';
import PlacesListPage from './pages/PlacesListPage';
import ProfileSettings from './pages/ProfileSettings';
import RecoverPage from './pages/RecoverPage';
import SeriesListPage from './pages/SeriesListPage';
import TournamentsAddPage from './pages/TournamentsAddPage';
import TournamentsListPage from './pages/TournamentsListPage';
import BackendProvider from './providers/BackendProvider';
import SiteProvider from './providers/SiteProvider';
import UserProvider from './providers/UserProvider';
import reportWebVitals from './reportWebVitals';
import store from './state/store.js';

ReactDOM.render(
	<UserProvider>
		<SiteProvider>
			<Router>
				<Provider store={store}>
					<NotificationProvider>
						<Switch>
							<Route exact path="/login"><LoginPage /></Route>
							{/* <Route exact path="/register"><RegistrationPage /></Route> */}
							<Route exact path="/recover"><RecoverPage /></Route>
							<Route path="/">
								<BackendProvider>
									<Layout>
										<Route exact path="/">
											<Homepage />
										</Route>
										{/* Series Pages */}
										{/* <Route exact path="/series"><SeriesListPage /></Route>
										<Route exact path="/series/add"><SeriesAddPage /></Route> */}
										{/* Events Pages */}
										<Route exact path="/events"><SeriesListPage /></Route>
										<Route exact path="/events/add"><EventsAddPage /></Route>
										<Route exact path="/events/:seriesId/add"><EventsAddPage /></Route>
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
										{/* Account Pages */}
										<Route exact path="/user/account"><MyAccountPage /></Route>
										<Route exact path="/user/profile"><ProfileSettings /></Route>
										{/* Admin Pages */}
										<Route exact path="/admin/dashboard"><AdminDashboard /></Route>
										{/* Admin Organization Pages */}
										<Route exact path="/admin/organizations"><AdminOrganizationListPage /></Route>
										<Route exact path="/admin/organizations/add"><OrganizationAddForm /></Route>
										{/* Admin Sites Pages */}
										<Route exact path="/admin/sites"><SiteListPage /></Route>
										<Route exact path="/admin/sites/add"><SiteAddPage /></Route>
										{/* Admin Users Pages */}
										<Route exact path="/admin/users"><AdminUsersListPage /></Route>
										<Route exact path="/admin/users/add"><AdminUsersAddPage /></Route>
									</Layout>
								</BackendProvider>
							</Route>
							<Redirect path="/logout" to="/login" />
							<Redirect to="/" />
						</Switch>
					</NotificationProvider>
				</Provider>
			</Router>
		</SiteProvider>
	</UserProvider>
, document.getElementById('root'));

reportWebVitals();

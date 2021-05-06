import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import OrganizationAddPage from 'pages/Admin/OrganizationAddPage';
import SiteAddPage from 'pages/Admin/SiteAddPage';
import EventsEditPage from 'pages/EventsEditPage';
import FailPage from 'pages/FailPage';
import SeriesAddPage from 'pages/SeriesAddPage';
import SeriesDetailAllEventsPage from 'pages/SeriesDetailAllEventsPage';
import SeriesDetailPage from 'pages/SeriesDetailPage';
import SeriesEditPage from 'pages/SeriesEditPage';
import TournamentEditPage from 'pages/TournamentEditPage';
import NotificationProvider from 'providers/NotificationProvider';

import Layout from './containers/Layout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminOrganizationListPage from './pages/Admin/OrganizationListPage';
import SiteListPage from './pages/Admin/SiteListPage';
import AdminUsersAddPage from './pages/Admin/UsersAddPage';
import AdminUsersListPage from './pages/Admin/UsersListPage';
import EventsAddPage from './pages/EventsAddPage';
import EventsListPage from './pages/EventsListPage';
import GamesAddPage from './pages/GamesAddPage';
import GamesListPage from './pages/GamesListPage';
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
import store from './state/store.js';

const pageVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'linear',
    duration: 0.3
  };

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<NotificationProvider>
				<AnimatePresence>
					<Switch>
						<Route exact path="/login"><LoginPage /></Route>
						{/* <Route exact path="/register"><RegistrationPage /></Route> */}
						<Route exact path="/recover"><RecoverPage /></Route>
						<Route exact path="/failure"><FailPage /></Route>
						<UserProvider>
							<SiteProvider>
								<BackendProvider>
									<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
										<Layout>
											{/* Series Pages */}
											<Route exact path="/series/add"><SeriesAddPage /></Route>
											<Route exact path="/series/view/:seriesId"><SeriesDetailPage /></Route>
											<Route exact path="/series/edit/:seriesId"><SeriesEditPage /></Route>
											<Route exact path="/series/view/:seriesId/all"><SeriesDetailAllEventsPage /></Route>
											{/* Events Pages */}
											<Route exact path="/events"><SeriesListPage /></Route>
											<Route exact path="/events/list"><EventsListPage /></Route>
											<Route exact path="/events/:seriesId/add"><EventsAddPage /></Route>
											<Route exact path="/events/edit/:eventId"><EventsEditPage /></Route>
											{/* Tournaments Pages */}
											<Route exact path="/tournaments"><TournamentsListPage /></Route>
											<Route exact path="/tournaments/add"><TournamentsAddPage /></Route>
											<Route exact path="/tournaments/edit/:tournamentId"><TournamentEditPage /></Route>
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
											<Route exact path="/admin/organizations/add"><OrganizationAddPage /></Route>
											{/* Admin Sites Pages */}
											<Route exact path="/admin/sites"><SiteListPage /></Route>
											<Route exact path="/admin/sites/add"><SiteAddPage /></Route>
											{/* Admin Users Pages */}
											<Route exact path="/admin/users"><AdminUsersListPage /></Route>
											<Route exact path="/admin/users/add"><AdminUsersAddPage /></Route>
											<Route exact path="/"><Redirect to="/events" /></Route>
										</Layout>
									</motion.div>
								</BackendProvider>
								
								
							</SiteProvider>
						</UserProvider>

						
						<Redirect path="/logout" to="/login" />
					</Switch>
				</AnimatePresence>
			</NotificationProvider>
		</Provider>
	</Router>
, document.getElementById('root'));

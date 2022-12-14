import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';

import OrganizationAddPage from 'pages/Admin/OrganizationAddPage';
import SiteAddPage from 'pages/Admin/SiteAddPage';
import SiteEditPage from 'pages/Admin/SiteEditPage';
import BracketsAddPage from 'pages/BracketAddPage';
import BracketsEditPage from 'pages/BracketEditPage';
import BracketsListPage from 'pages/BracketListPage';
import EventsEditPage from 'pages/EventsEditPage';
import FailPage from 'pages/FailPage';
import GamesEditPage from 'pages/GamesEditPage';
import GamesModesAddPage from 'pages/GamesModesAddPage';
import GamesModesEditPage from 'pages/GamesModesEditPage';
import GamesModesListPage from 'pages/GamesModesListPage';
import GamesPlatformsAddPage from 'pages/GamesPlatformsAddPage';
import GamesPlatformsEditPage from 'pages/GamesPlatformsEditPage';
import GamesPlatformsListPage from 'pages/GamesPlatformsListPage';
import PagesEditPage from 'pages/PagesEditPage';
import PagesListPage from 'pages/PagesListPage';
import PlacesEditPage from 'pages/PlacesEditPage';
import RulesAddPage from 'pages/RulesAddPage';
import RulesEditPage from 'pages/RulesEditPage';
import RulesListPage from 'pages/RulesListPage';
import SeriesAddPage from 'pages/SeriesAddPage';
import SeriesDetailAllEventsPage from 'pages/SeriesDetailAllEventsPage';
import SeriesDetailPage from 'pages/SeriesDetailPage';
import SeriesEditPage from 'pages/SeriesEditPage';
import ServiceAreaAddPage from 'pages/ServiceAreaAddPage';
import ServiceAreaEditPage from 'pages/ServiceAreaEditPage';
import ServiceAreaListPage from 'pages/ServiceAreaListPage';
import StreamsAddPage from 'pages/StreamsAddPage';
import StreamsEditPage from 'pages/StreamsEditPage';
import StreamsListPage from 'pages/StreamsListPage';
import TournamentEditPage from 'pages/TournamentEditPage';
import NotificationProvider from 'providers/NotificationProvider';

import Layout from './containers/Layout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import GamesAddPage from './pages/Admin/GamesAddPage';
import AdminOrganizationListPage from './pages/Admin/OrganizationListPage';
import SiteListPage from './pages/Admin/SiteListPage';
import AdminUsersAddPage from './pages/Admin/UsersAddPage';
import AdminUsersListPage from './pages/Admin/UsersListPage';
import EventsAddPage from './pages/EventsAddPage';
import EventsListPage from './pages/EventsListPage';
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
import history from './utils/history';

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
	<Router history={history}>
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
											<Route exact path="/games/edit/:gameId"><GamesEditPage /></Route>
											<Route exact path="/games/modes"><GamesModesListPage /></Route>
											<Route exact path="/games/modes/add"><GamesModesAddPage /></Route>
											<Route exact path="/games/modes/edit/:modeId"><GamesModesEditPage /></Route>
											<Route exact path="/games/platforms"><GamesPlatformsListPage /></Route>
											<Route exact path="/games/platforms/add"><GamesPlatformsAddPage /></Route>
											<Route exact path="/games/platforms/edit/:platformId"><GamesPlatformsEditPage /></Route>
											{/* Places Pages */}
											<Route exact path="/places"><PlacesListPage /></Route>
											<Route exact path="/places/add"><PlacesAddPage /></Route>
											<Route exact path="/places/edit/:placeId"><PlacesEditPage /></Route>
											{/* Rules Pages */}
											<Route exact path="/games/rules"><RulesListPage /></Route>
											<Route exact path="/games/rules/add"><RulesAddPage /></Route>
											<Route exact path="/games/rules/edit/:ruleId"><RulesEditPage /></Route>
											{/* Bracket Pages */}
											<Route exact path="/tournaments/brackets"><BracketsListPage /></Route>
											<Route exact path="/tournaments/brackets/add"><BracketsAddPage /></Route>
											<Route exact path="/tournaments/brackets/edit/:bracketId"><BracketsEditPage /></Route>
											{/* ServiceArea Pages */}
											<Route exact path="/service-areas"><ServiceAreaListPage /></Route>
											<Route exact path="/service-areas/add"><ServiceAreaAddPage /></Route>
											<Route exact path="/service-areas/edit/:regionId"><ServiceAreaEditPage /></Route>
											{/* Stream Pages */}
											<Route exact path="/streams"><StreamsListPage /></Route>
											<Route exact path="/streams/add"><StreamsAddPage /></Route>
											<Route exact path="/streams/edit/:streamId"><StreamsEditPage /></Route>
											{/* Pages (for sites) */}
											<Route exact path="/pages"><PagesListPage /></Route>
											<Route exact path="/pages/edit/:pageId"><PagesEditPage /></Route>
											{/* Account Pages */}
											<Route exact path="/user/account"><MyAccountPage /></Route>
											<Route exact path="/user/profile"><ProfileSettings /></Route>
											{/* Admin Pages */}
											<Route exact path="/admin/dashboard"><AdminDashboard /></Route>
											{/* Admin Games */}
											<Route exact path="/admin/games"><GamesListPage /></Route>
											<Route exact path="/admin/games/add"><GamesAddPage /></Route>
											{/* Admin Organization Pages */}
											<Route exact path="/admin/organizations"><AdminOrganizationListPage /></Route>
											<Route exact path="/admin/organizations/add"><OrganizationAddPage /></Route>
											{/* Admin Sites Pages */}
											<Route exact path="/admin/sites"><SiteListPage /></Route>
											<Route exact path="/admin/sites/add"><SiteAddPage /></Route>
											<Route exact path="/admin/sites/edit/:siteId"><SiteEditPage /></Route>
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

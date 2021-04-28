import { AnimatePresence, motion } from 'framer-motion';
import OrganizationAddPage from 'pages/Admin/OrganizationAddPage';
import SiteAddPage from 'pages/Admin/SiteAddPage';
import SeriesAddPage from 'pages/SeriesAddPage';
import SeriesDetailAllEventsPage from 'pages/SeriesDetailAllEventsPage';
import SeriesDetailPage from 'pages/SeriesDetailPage';
import NotificationProvider from 'providers/NotificationProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
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
								<motion.div
									initial="initial"
									animate="in"
									exit="out"
									variants={pageVariants}
									transition={pageTransition}>
										<UserProvider>
											<SiteProvider>
												<Route path="/">
													<BackendProvider>
														<Layout>
															<Route exact path="/">
																<Redirect to="/events" />
															</Route>
															{/* Series Pages */}
															<Route exact path="/series/:seriesId"><SeriesDetailPage /></Route>
															<Route exact path="/series/add"><SeriesAddPage /></Route>
															<Route exact path="/series/:seriesId/all"><SeriesDetailAllEventsPage /></Route>
															{/* Events Pages */}
															<Route exact path="/events"><SeriesListPage /></Route>
															<Route exact path="/events/list"><EventsListPage /></Route>
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
															<Route exact path="/admin/organizations/add"><OrganizationAddPage /></Route>
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
												<Redirect to="/events" />
											</SiteProvider>
										</UserProvider>
								</motion.div>
							</Switch>
						</AnimatePresence>
					</NotificationProvider>
				</Provider>
			</Router>
, document.getElementById('root'));

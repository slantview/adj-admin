import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse, ListItem } from '@material-ui/core';
import ChevronRightTwoToneIcon from '@material-ui/icons/ChevronRightTwoTone';
import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import AdminMenu from 'pages/Admin/AdminMenu';

import SiteSelector from '../SiteSelector';
import Userbox from '../Userbox/index';

const ListItemLink = (props) => {
    return <ListItem button component={Link} {...props} />;
}

const Sidebar = (props) => {
    const [currentCategory, setCurrentCategory] = React.useState('');

    const handleCategoryClick = (name) => {
        if (name !== currentCategory) {
            setCurrentCategory(name);
        }
    };

    const isNavCategory = (name, checkPage = true) => {
        return name === currentCategory;
    }

    useEffect(() => {
        let active = true;
        
        if (active) {
            const pathArr = window.location.pathname.split('/');
            if (pathArr.length <= 1) {
                setCurrentCategory('events');
            } else if (pathArr.length === 3) {
                setCurrentCategory(pathArr[2]);
            } else {
                setCurrentCategory(pathArr[1]);
            }
        }
        
        return () => {
            active = false;
        }
    }, [currentCategory])

    return (
        <div className="app-sidebar app-sidebar--dark">
            <div className="app-sidebar--content">
                <div className="text-center py-3">
                    <SiteSelector />
                </div>
                <div className="sidebar-navigation nav-alt mt-4">
                    <div className="sidebar-header opacity-5">
                        <span>Navigation</span>
                    </div>
                    <ul>
                        {/* <li>
                            <NavLink
                                activeClassName={isNavCategory('dashboard') ? "active" : null} 
                                key="dashboard" 
                                onClick={() => handleCategoryClick('dashboard')}
                                className="nav-link-simple"
                                to="/">
                                    <span className="sidebar-icon">
                                        <DashboardIcon />
                                    </span>
                                    Dashboard
                                    <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                        <ChevronRightTwoToneIcon />
                                    </span>
                            </NavLink>
                        </li> */}
                        <li>
                            <NavLink
                                activeClassName={isNavCategory('events') ? "active" : null} 
                                key="events" 
                                onClick={() => handleCategoryClick('events')}
                                className="nav-link-simple"
                                to="/events">
                                    <span className="sidebar-icon">
                                        <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                                    </span>
                                    Events
                                    <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                        <ChevronRightTwoToneIcon />
                                    </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName={isNavCategory('tournaments') ? "active" : null} 
                                key="tournaments" 
                                onClick={() => handleCategoryClick('tournaments')}
                                className="nav-link-simple"
                                to="/tournaments">
                                    <span className="sidebar-icon">
                                        <FontAwesomeIcon icon={['fas', 'trophy']} />
                                    </span>
                                    Tournaments
                                    <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                        <ChevronRightTwoToneIcon />
                                    </span>
                            </NavLink>
                        </li>
                        <Collapse in={isNavCategory('tournaments', false) || isNavCategory('brackets')} timeout="auto" unmountOnExit>
                            <li>
                                <NavLink
                                    activeClassName={isNavCategory('brackets') ? "active" : null} 
                                    key="brackets" 
                                    onClick={() => handleCategoryClick('brackets')}
                                    className="nav-link-simple"
                                    to="/tournaments/brackets">
                                        <span className="sidebar-icon ml-4">
                                            <FontAwesomeIcon icon={['fas', 'stream']} />
                                        </span>
                                        Bracket Formats
                                        <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                            <ChevronRightTwoToneIcon />
                                        </span>
                                </NavLink>
                            </li>
                        </Collapse>
                        <li>
                            <NavLink
                                activeClassName={isNavCategory('games') ? "active" : null} 
                                key="games" 
                                onClick={() => handleCategoryClick('games')}
                                className="nav-link-simple"
                                to="/games">
                                    <span className="sidebar-icon">
                                        <FontAwesomeIcon icon={['fas', 'gamepad']} />
                                    </span>
                                    Games
                                    <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                        <ChevronRightTwoToneIcon />
                                    </span>
                            </NavLink>
                        </li>
                        <Collapse in={isNavCategory('games', false) || isNavCategory('rules') || 
                                      isNavCategory('modes') || isNavCategory('platforms') } timeout="auto" unmountOnExit>
                            <li>
                                <NavLink
                                    activeClassName={isNavCategory('rules') ? "active" : null} 
                                    key="rules" 
                                    onClick={() => handleCategoryClick('rules')}
                                    className="nav-link-simple"
                                    to="/games/rules">
                                        <span className="sidebar-icon ml-4">
                                            <FontAwesomeIcon icon={['fas', 'book-open']} />
                                        </span>
                                        Rules
                                        <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                            <ChevronRightTwoToneIcon />
                                        </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName={isNavCategory('modes') ? "active" : null} 
                                    key="modes" 
                                    onClick={() => handleCategoryClick('modes')}
                                    className="nav-link-simple"
                                    to="/games/modes">
                                        <span className="sidebar-icon ml-4">
                                            <FontAwesomeIcon icon={['fas', 'gamepad']} />
                                        </span>
                                        Modes
                                        <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                            <ChevronRightTwoToneIcon />
                                        </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName={isNavCategory('platforms') ? "active" : null} 
                                    key="platforms" 
                                    onClick={() => handleCategoryClick('platforms')}
                                    className="nav-link-simple"
                                    to="/games/platforms">
                                        <span className="sidebar-icon ml-4">
                                            <FontAwesomeIcon icon={['fas', 'desktop']} />
                                        </span>
                                        Platforms
                                        <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                            <ChevronRightTwoToneIcon />
                                        </span>
                                </NavLink>
                            </li>
                        </Collapse>
                        <li>
                            <NavLink
                                activeClassName={isNavCategory('places') ? "active" : null} 
                                key="places" 
                                onClick={() => handleCategoryClick('places')}
                                className="nav-link-simple"
                                to="/places">
                                    <span className="sidebar-icon">
                                        <FontAwesomeIcon icon={['fas', 'map-pin']} />
                                    </span>
                                    Venues
                                    <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                        <ChevronRightTwoToneIcon />
                                    </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName={isNavCategory('service-areas') ? "active" : null} 
                                key="service-areas" 
                                onClick={() => handleCategoryClick('service-areas')}
                                className="nav-link-simple"
                                to="/service-areas">
                                    <span className="sidebar-icon">
                                        <FontAwesomeIcon icon={['fas', 'map']} />
                                    </span>
                                    Service Areas
                                    <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                        <ChevronRightTwoToneIcon />
                                    </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName={isNavCategory('streams') ? "active" : null} 
                                key="streams" 
                                onClick={() => handleCategoryClick('streams')}
                                className="nav-link-simple"
                                to="/streams">
                                    <span className="sidebar-icon">
                                        <FontAwesomeIcon icon={['fas', 'tv']} />
                                    </span>
                                    Streams
                                    <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                        <ChevronRightTwoToneIcon />
                                    </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName={isNavCategory('pages') ? "active" : null} 
                                key="pages" 
                                onClick={() => handleCategoryClick('pages')}
                                className="nav-link-simple"
                                to="/pages">
                                    <span className="sidebar-icon">
                                        <FontAwesomeIcon icon={['far', 'window-maximize']} />
                                    </span>
                                    Pages
                                    <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                        <ChevronRightTwoToneIcon />
                                    </span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sidebar-footer">
                <div>
                    <AdminMenu />
                </div>
                <div className="divider opacity-5" />
                <Userbox />
            </div>
        </div>
    );
}

export default Sidebar;
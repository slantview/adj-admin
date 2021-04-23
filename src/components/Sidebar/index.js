import { ListItem } from '@material-ui/core';
import ChevronRightTwoToneIcon from '@material-ui/icons/ChevronRightTwoTone';
import EventNoteIcon from '@material-ui/icons/EventNoteTwoTone';
import GamesIcon from '@material-ui/icons/GamesTwoTone';
import PeopleIcon from '@material-ui/icons/PeopleTwoTone';
import PlaceIcon from '@material-ui/icons/PlaceTwoTone';
import AdminMenu from 'pages/Admin/AdminMenu';
import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import SiteSelector from '../SiteSelector';
import Userbox from '../Userbox/index';

const ListItemLink = (props) => {
    return <ListItem button component={Link} {...props} />;
}

const Sidebar = (props) => {
    const userCtx = useContext(UserContext);
    const [category, setCategory] = React.useState('');
    const [page, setPage] = React.useState(null);

    const handleCategoryClick = (name) => {
        if (name === category) {
            setCategory(null);
        } else {
            setCategory(name);
            setPage(null);
        }
    };
    const handlePageClick = (name) => {
        setPage(name);
    }
    const isNavCategory = (name, checkPage = true) => {
        return name === category && (checkPage ? page === null : true);
    }
    const isNavPage = (name) => {
        return name === page;
    }

    useEffect(() => {
        const firstPathElement = window.location.pathname.split('/').shift();
        if (firstPathElement === '') {
            setCategory('events');
        } else {
            setCategory(firstPathElement);
        }
    }, [])
    
    console.log(category);

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
                                        <EventNoteIcon />
                                    </span>
                                    Events
                                    <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                        <ChevronRightTwoToneIcon />
                                    </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName={isNavCategory('games') ? "active" : null} 
                                key="games" 
                                onClick={() => handleCategoryClick('games')}
                                className="nav-link-simple"
                                to="/games">
                                    <span className="sidebar-icon">
                                        <GamesIcon />
                                    </span>
                                    Games
                                    <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                        <ChevronRightTwoToneIcon />
                                    </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName={isNavCategory('places') ? "active" : null} 
                                key="places" 
                                onClick={() => handleCategoryClick('places')}
                                className="nav-link-simple"
                                to="/places">
                                    <span className="sidebar-icon">
                                        <PlaceIcon />
                                    </span>
                                    Venues
                                    <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                        <ChevronRightTwoToneIcon />
                                    </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName={isNavCategory('team') ? "active" : null} 
                                key="team" 
                                onClick={() => handleCategoryClick('team')}
                                className="nav-link-simple"
                                to="/team">
                                    <span className="sidebar-icon">
                                        <PeopleIcon />
                                    </span>
                                    Team
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
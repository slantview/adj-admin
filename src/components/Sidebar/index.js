import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/BusinessTwoTone';
import ChevronRightTwoToneIcon from '@material-ui/icons/ChevronRightTwoTone';
import DashboardIcon from '@material-ui/icons/DashboardTwoTone';
import DateRangeIcon from '@material-ui/icons/DateRangeTwoTone';
import EventNoteIcon from '@material-ui/icons/EventNoteTwoTone';
import GamesIcon from '@material-ui/icons/GamesTwoTone';
import LanguageIcon from '@material-ui/icons/LanguageTwoTone';
import PeopleIcon from '@material-ui/icons/PeopleTwoTone';
import PlaceIcon from '@material-ui/icons/PlaceTwoTone';
import SportsEsportsIcon from '@material-ui/icons/SportsEsportsTwoTone';
import _ from 'lodash';
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { UserContext } from '../../providers/UserProvider';
import useStyles from '../../theme/useStyles';
import SiteSelector from '../SiteSelector';
import Userbox from '../Userbox/index';

const ListItemLink = (props) => {
    return <ListItem button component={Link} {...props} />;
}

const Sidebar = (props) => {
    const userCtx = useContext(UserContext);
    const classes = useStyles();
    const [category, setCategory] = React.useState("dashboard");
    const [page, setPage] = React.useState(null);
    const [open, setOpen] = React.useState(props.open);

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

    return (
        <div className="app-sidebar app-sidebar--dark app-sidebar--shadow">
            {/* <SidebarHeader /> */}
            <div className="app-sidebar--content">
                <div className="sidebar-header">
                    <div className="text-center py-3">
                        <SiteSelector />
                    </div>
                    <div className="divider opacity-5" />
                    
                    <Userbox />
                </div>

                <div className="sidebar-navigation nav-alt">
                    <div className="sidebar-header opacity-5">
                        <span>Content Admin</span>
                    </div>
                    <ul>
                        <li>
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
                        </li>
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
                                onClick={() => handleCategoryClick('users')}
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
                    { userCtx.admin &&
                        <div className="">
                            <div className="divider opacity-5" />
                            <div className="sidebar-header opacity-5">
                                <span>Admin Menu</span>
                            </div>
                            <ul>
                                <li>
                                    <NavLink
                                        activeClassName={isNavCategory('admin-dashboard') ? "active" : null} 
                                        key="admin-dashboard" 
                                        onClick={() => handleCategoryClick('admin-dashboard')}
                                        className="nav-link-simple"
                                        to="/admin/dashboard">
                                            <span className="sidebar-icon">
                                                <DashboardIcon />
                                            </span>
                                            Dashboard
                                            <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                                <ChevronRightTwoToneIcon />
                                            </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        activeClassName={isNavCategory('admin-organizations') ? "active" : null} 
                                        key="admin-organizations" 
                                        onClick={() => handleCategoryClick('admin-organizations')}
                                        className="nav-link-simple"
                                        to="/admin/organizations">
                                            <span className="sidebar-icon">
                                                <BusinessIcon />
                                            </span>
                                            Organizations
                                            <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                                <ChevronRightTwoToneIcon />
                                            </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        activeClassName={isNavCategory('admin-sites') ? "active" : null} 
                                        key="admin-sites" 
                                        onClick={() => handleCategoryClick('admin-users')}
                                        className="nav-link-simple"
                                        to="/admin/sites">
                                            <span className="sidebar-icon">
                                                <LanguageIcon />
                                            </span>
                                            Sites
                                            <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                                <ChevronRightTwoToneIcon />
                                            </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        activeClassName={isNavCategory('admin-users') ? "active" : null} 
                                        key="admin-users" 
                                        onClick={() => handleCategoryClick('admin-users')}
                                        className="nav-link-simple"
                                        to="/admin/users">
                                            <span className="sidebar-icon">
                                                <PeopleIcon />
                                            </span>
                                            Users
                                            <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                                <ChevronRightTwoToneIcon />
                                            </span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
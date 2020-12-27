import React, { Component } from 'react';
import {
    Collapse,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar
} from '@material-ui/core';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DateRangeIcon from '@material-ui/icons/DateRange';
import GamesIcon from '@material-ui/icons/Games';
import PlaceIcon from '@material-ui/icons/Place';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ViewDayIcon from '@material-ui/icons/ViewDay';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import NoteIcon from '@material-ui/icons/Note';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import MapIcon from '@material-ui/icons/Map';
import DashboardIcon from '@material-ui/icons/Dashboard';
import useStyles from '../../theme/useStyles';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const ListItemLink = (props) => {
    return <ListItem button component={Link} {...props} />;
}

const Sidebar = (props) => {
    const classes = useStyles();
    console.log(window.location.pathname)
    const [category, setCategory] = React.useState(window.location.pathname === '/' || window.location.pathname === '' ? "dashboard" : null);
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

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            PaperProps={{elevation: 1}}
            elevation={1}
            anchor="left"
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List component="div" className="nav-neutral-primary nav-alt">
                    <ListItemLink to="/" selected={isNavCategory('dashboard')} key="dashboard" onClick={() => handleCategoryClick('dashboard')}>
                        <ListItemIcon className="text-center"><DashboardIcon /></ListItemIcon>
                        <ListItemText primary="Dashboard">
                    </ListItemText>
                    </ListItemLink>
                    <ListItemLink to="/series" selected={isNavCategory('series')} key="series" onClick={() => handleCategoryClick('series')}>
                        <ListItemIcon className="text-center"><EventNoteIcon /></ListItemIcon>
                        <ListItemText primary="Series" />
                    </ListItemLink>
                    {/* <Collapse in={isNavCategory('series', false)} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemLink className={classes.nested} to="/series/add" selected={isNavPage('series-add')} onClick={() => handlePageClick('series-add')}>
                                <ListItemIcon className="font-size-sm"><LibraryAddIcon /></ListItemIcon>
                                <ListItemText className="font-size-xs">Add Series</ListItemText>
                            </ListItemLink>
                            <ListItemLink to="/series" className={classes.nested} selected={isNavPage('series-view')} onClick={() => handlePageClick('series-view')}>
                                <ListItemIcon className="font-size-sm text-center"><ViewDayIcon /></ListItemIcon>
                                <ListItemText className="font-size-xs">View Series</ListItemText>
                            </ListItemLink>
                        </List>
                    </Collapse> */}
                    <ListItemLink to="/events" selected={isNavCategory('events')} key="events" onClick={() => handleCategoryClick('events')}>
                        <ListItemIcon className="text-center"><DateRangeIcon /></ListItemIcon>
                        <ListItemText primary="Events" />
                    </ListItemLink>
                    {/* <Collapse in={isNavCategory('events', false)} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemLink to="/events/add" className={classes.nested} selected={isNavPage('events-add')} onClick={() => handlePageClick('events-add')}>
                                <ListItemIcon className="font-size-sm"><LibraryAddIcon /></ListItemIcon>
                                <ListItemText className="font-size-xs">Add Event</ListItemText>
                            </ListItemLink>
                            <ListItemLink to="/events" className={classes.nested} selected={isNavPage('events-view')} onClick={() => handlePageClick('events-view')}>
                                <ListItemIcon className="font-size-sm"><ViewDayIcon /></ListItemIcon>
                                <ListItemText className="font-size-xs">View Events</ListItemText>
                            </ListItemLink>
                        </List>
                    </Collapse> */}
                    <ListItemLink to="/tournaments" selected={isNavCategory('tournaments')} key="tournaments" onClick={() => handleCategoryClick('tournaments')}>
                        <ListItemIcon className="text-center"><SportsEsportsIcon /></ListItemIcon>
                        <ListItemText primary="Tournaments" />
                    </ListItemLink>
                    {/* <Collapse in={isNavCategory('tournaments', false)} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemLink to="/tournaments/add" className={classes.nested} selected={isNavPage('tournaments-add')} onClick={() => handlePageClick('tournaments-add')}>
                                <ListItemIcon className="font-size-sm"><LibraryAddIcon /></ListItemIcon>
                                <ListItemText className="font-size-xs">Add Tournament</ListItemText>
                            </ListItemLink>
                            <ListItemLink to="/tournaments" className={classes.nested} selected={isNavPage('tournaments-view')} onClick={() => handlePageClick('tournaments-view')}>
                                <ListItemIcon className="font-size-sm"><ViewDayIcon /></ListItemIcon>
                                <ListItemText className="font-size-xs">View Tournaments</ListItemText>
                            </ListItemLink>
                        </List>
                    </Collapse> */}
                    <ListItemLink to="/games" selected={isNavCategory('games')} key="games" onClick={() => handleCategoryClick('games')}>
                        <ListItemIcon className="text-center"><GamesIcon /></ListItemIcon>
                        <ListItemText primary="Games" />
                    </ListItemLink>
                    {/* <Collapse in={isNavCategory('games', false)} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemLink to="/games/add" className={classes.nested}>
                                <ListItemIcon className="font-size-sm"><LibraryAddIcon /></ListItemIcon>
                                <ListItemText className="font-size-xs">Add Game</ListItemText>
                            </ListItemLink>
                            <ListItemLink to="/games" className={classes.nested}>
                                <ListItemIcon className="font-size-sm"><ViewDayIcon /></ListItemIcon>
                                <ListItemText className="font-size-xs">View Games</ListItemText>
                            </ListItemLink>
                        </List>
                    </Collapse> */}
                    <ListItemLink to="/places" selected={isNavCategory('places')} key="places" onClick={() => handleCategoryClick('places')}>
                        <ListItemIcon className="text-center"><PlaceIcon /></ListItemIcon>
                        <ListItemText primary="Places" />
                    </ListItemLink>
                    {/* <Collapse in={isNavCategory('places', false)} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemLink to="/places/add" className={classes.nested}>
                                <ListItemIcon className="font-size-sm"><AddLocationIcon /></ListItemIcon>
                                <ListItemText className="font-size-xs">Add Place</ListItemText>
                            </ListItemLink>
                            <ListItemLink to="/places" className={classes.nested}>
                                <ListItemIcon className="font-size-sm"><MapIcon /></ListItemIcon>
                                <ListItemText className="font-size-xs">View Places</ListItemText>
                            </ListItemLink>
                        </List>
                    </Collapse> */}
                </List>
            </div>
        </Drawer>
    );
}

export default Sidebar;
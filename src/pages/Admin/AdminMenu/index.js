import { Button, Collapse, Divider, Drawer, Link, Menu, SwipeableDrawer } from '@material-ui/core';
import { OpenInBrowser } from '@material-ui/icons';
import BusinessIcon from '@material-ui/icons/BusinessTwoTone';
import ChevronRightTwoToneIcon from '@material-ui/icons/ChevronRightTwoTone';
import DashboardIcon from '@material-ui/icons/DashboardTwoTone';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import LanguageIcon from '@material-ui/icons/LanguageTwoTone';
import PeopleIcon from '@material-ui/icons/PeopleTwoTone';
import { UserContext } from 'providers/UserProvider';
import React, { useContext, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = (props) => {
    const userCtx = useContext(UserContext);
    const [category, setCategory] = React.useState('');
    const [open, setOpen] = useState(false);

    const handleCategoryClick = (name) => {
        if (name === category) {
            setCategory(null);
        } else {
            setCategory(name);
        }
    };

    const isNavCategory = (name) => {
        return name === category;
    };

    const handleAdminMenuClick = (e) => {
        setOpen(!open);
        e.preventDefault();
    };

    return (
        <>    
            { userCtx.admin &&
                <div>
                    <div className="sidebar-navigation nav-alt">
                        <div className="sidebar-header m-0">
                            <Button onClick={handleAdminMenuClick} className="mx-0 text-white-50 btn-neutral-primary w-100">
                                <span className="font-weight-bold text-white-50">Admin Menu</span>
                                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                                    { open ? (
                                        <KeyboardArrowUpIcon />
                                    ) : (
                                        <KeyboardArrowDownIcon />
                                    )}
                                </span>
                            </Button>
                        </div>
                        <Collapse in={open}>
                            <Divider className="w-100 text-white font-weight-light" />
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
                                        onClick={() => handleCategoryClick('admin-sites')}
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
                        </Collapse>
                    </div>
                </div>
            }
        </>
    );
}

export default AdminMenu;
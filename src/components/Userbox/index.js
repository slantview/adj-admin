import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Badge, Menu, Button, List, ListItem, Divider } from '@material-ui/core';
import { UserContext } from "../../providers/UserProvider";
import { auth } from '../../utils/firebase';
import { useHistory } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/PersonTwoTone';
import avatar from '../../assets/images/icon.png';

const ListItemLink = (props) => {
    return <ListItem button component={Link} {...props} />;
}

const Userbox = () => {
    const userCtx = useContext(UserContext);
	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState(false);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const logout = () => {
		auth.signOut()
			.then(() => {
				userCtx.logout();
				history.push('/login', true);
			})
			.catch(e => {
				console.error('Error signing out: ', e);
			})
	}

  return (
    <div>
      <div className="app-sidebar--userbox">
        <Box className="card-tr-actions">
          <Button
            variant="text"
            onClick={handleClick}
            className="ml-2 p-0 d-30 border-0 btn-transition-none text-white-50"
            disableRipple>
            <FontAwesomeIcon
              icon={['fas', 'ellipsis-h']}
              className="font-size-lg"
            />
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            open={Boolean(anchorEl)}
            classes={{ list: 'p-0' }}
            onClose={handleClose}>
            <div className="dropdown-menu-lg overflow-hidden p-0">
              <div className="align-box-row align-items-center p-3">
                <div className="avatar-icon-wrapper avatar-icon-md">
                  <div className="avatar-icon rounded-circle">
                    <img alt={userCtx.user.displayName} src={userCtx.user.photoURL ? userCtx.user.photoURL : avatar} />
                  </div>
                </div>
                <div className="pl-2">
                  <span className="font-weight-bold d-block">{userCtx.user.displayName}</span>
                  { userCtx.admin && <div className="badge badge-success font-weight-bold border-0">Admin</div> }
                </div>
              </div>
              <Divider className="w-100" />
              <div className="d-flex py-1 justify-content-center">
                <div className="dropdown-menu-lg overflow-hidden p-0">
                    <List
                        component="div"
                        className="nav-neutral-primary text-left d-flex align-items-center flex-column">
                        <ListItemLink to="/user/account" onClick={handleClose} button className="d-block text-left">
                            My Account
                        </ListItemLink>
                        <ListItemLink to="/user/profile" onClick={handleClose} button className="d-block text-left">
                            Profile Settings
                        </ListItemLink>
                        <ListItem onClick={logout} button className="d-block text-left">
                            Logout
                        </ListItem>
                    </List>
				        </div>
              </div>
            </div>
          </Menu>
        </Box>
        <div className="avatar-icon-wrapper avatar-icon-lg">
			<div className="avatar-icon rounded-circle">
				{ userCtx.user.photoURL ? (
					<img alt={userCtx.user.displayName} src={userCtx.user.photoURL} />
				) : (
					<PersonIcon color="primary" fontSize="large" />
				)}
                
            </div>
        </div>
        <div className="my-1 userbox-details">
          <span className="font-weight-bold">{userCtx.user.displayName}</span>
          <small className="d-block text-white-50">
            {userCtx.user.email}
          </small>
        </div>
        <Button
          component={NavLink}
          to="/user/profile"
          size="small"
          className="btn-userbox">
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default Userbox;

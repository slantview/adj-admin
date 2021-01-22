import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Typography,
  Menu,
  Button,
  List,
  ListItem
} from '@material-ui/core';
import { UserContext } from "../../providers/UserProvider";
import { auth } from '../../utils/firebase';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
		<>
			<Button
				variant="text"
				onClick={handleClick}
				className="mr-5 btn-transition-none text-left p-0 bg-transparent align-items-center"
				disableRipple
				style={{width: "250px"}}>
				<div className="d-block p-0 avatar-icon-wrapper">
					<div className="avatar-icon rounded-lg">
						{ userCtx.user.photoURL ? (
							<img src={userCtx.user.photoURL} alt={userCtx.user.displayName} height={60} />
						) : (
							<PersonIcon color="primary" fontSize="large" />
						)}
					</div>
				</div>
				
				<div className=" d-xl-block pr-2">
					<div className="font-weight-bold pt-2 text-primary text-uppercase line-height-1">
						{userCtx.user.displayName ? userCtx.user.displayName : "Beacons User"}
					</div>
					<span className="text-black-50 font-size-xs">{userCtx.user.email}</span>
				</div>
				<div>
					{ userCtx.admin &&
						<span className="ml-1 badge badge-success font-weight-bold text-black text-uppercase">Admin</span>
					}
				</div>
				<span className="pl-1 pr-xl-3">
					<FontAwesomeIcon icon={['fas', 'angle-down']} className="opacity-5" />
				</span>
			</Button>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: 'top',
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
						<div className="d-flex px-3 pt-3 align-items-center justify-content-between">
							<Typography className="text-uppercase pl-1 font-weight-bold text-primary">
								<span>Profile Options</span>
							</Typography>
						</div>
						<List
							component="div"
							className="nav-neutral-primary text-left d-flex align-items-center flex-column px-3 pb-3">
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
			</Menu>
		</>
	);
};

export default Userbox;

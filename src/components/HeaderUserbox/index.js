import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Typography,
  Badge,
  Menu,
  Button,
  List,
  ListItem,
  Tooltip,
  Divider
} from '@material-ui/core';
import avatar7 from '../../assets/images/avatars/avatar7.jpg';
import { withStyles } from '@material-ui/core/styles';
import { useAuth0 } from "@auth0/auth0-react";

const StyledBadge = withStyles({
  badge: {
    backgroundColor: 'var(--success)',
    color: 'var(--success)',
    boxShadow: '0 0 0 2px #fff',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
})(Badge);

const HeaderUserbox = () => {
	const { user, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();
	const [userMetadata, setUserMetadata] = useState(null);

	useEffect(() => {
		const getUserMetadata = async () => {
		  const domain = "beacons.us.auth0.com";
	  
			try {
				const accessToken = await getAccessTokenSilently({
					audience: `https://${domain}/api/v2/`,
					scope: "read:current_user",
				});
		
				const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
		
				const metadataResponse = await fetch(userDetailsByIdUrl, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
		
				const { user_metadata } = await metadataResponse.json();
		
				setUserMetadata(user_metadata);
			} catch (e) {
				console.log(e.message);
			}
		};
	  
		getUserMetadata();
	}, []);

	const [anchorEl, setAnchorEl] = useState(false);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				variant="text"
				onClick={handleClick}
				className="ml-2 btn-transition-none text-left p-0 bg-transparent align-items-center"
				disableRipple>
				<div className="d-block p-0 avatar-icon-wrapper">
					<div className="avatar-icon rounded-lg">
						<img src={user.picture} alt={user.name} height={60} />
					</div>
				</div>

				<div className="d-none d-xl-block pl-2">
					<div className="font-weight-bold pt-2 text-primary text-uppercase line-height-1">{userMetadata ? userMetadata.full_name : user.nickname}</div>
          			<span className="text-black-50">{user.email}</span>
				</div>
					<span className="pl-1 pl-xl-3">
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
							<ListItem button className="d-block text-left">
								My Account
							</ListItem>
							<ListItem button className="d-block text-left">
								Profile settings
							</ListItem>
							<ListItem onClick={logout} button className="d-block text-left">
								Logout
							</ListItem>
						</List>
					</div>
			</Menu>
		</>
	);
};

export default HeaderUserbox;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Divider, Grid, List, ListItem, Menu } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/PersonTwoTone';
import React, { useContext, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import avatar from '../../assets/images/icon.png';
import { UserContext } from "../../providers/UserProvider";
import { auth } from '../../utils/firebase';

const ListItemLink = (props) => {
    return <ListItem button component={Link} {...props} />;
}

const Userbox = () => {
    const userCtx = useContext(UserContext);
	const history = useHistory();
	const menuRef = useRef(null);
	const [open, setOpen] = useState(false);

	const handleClick = (event) => {
		setOpen(!open);
		event.preventDefault();
	};
	const handleClose = () => {
		setOpen(false);
	};

	const logout = () => {
		auth.signOut()
			.then(() => {
				// @ts-ignore
				userCtx.logout();
			})
			.catch(e => {
				console.error('Error signing out: ', e);
			})
	}

	return (
		<>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<Card>
					<Menu
						anchorEl={menuRef.current}
						open={open}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center'
						}}
						transformOrigin={{
							vertical: 250,
							horizontal: 'center'
						}}
						onClose={handleClose}>
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
										style={{width: "288px"}}
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
					</Menu>
				</Card>
			</Grid>
			<div className="app-sidebar--userbox m-0 pb-4" ref={menuRef}>
				<Grid container>
					<Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
						<div className="avatar-icon-lg ml-2" >
							<div className="avatar-icon rounded-circle">
								<Link onClick={handleClick} to="" className="text-white font-weight-bold">
									{ userCtx.user.photoURL ? (
										<img alt={userCtx.user.displayName} src={userCtx.user.photoURL} />
									) : (
										<PersonIcon color="primary" fontSize="large" />
									)}
								</Link>
							</div>
						</div>
					</Grid>
					<Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
						<div className="my-1 userbox-details" ref={menuRef}>
							<Link onClick={handleClick} to="" className="text-white font-weight-bold">
								<span className="font-weight-bold text-left">{userCtx.user.displayName}</span>
								<small className="d-block text-white-50">
									{userCtx.user.email}
								</small>
							</Link>
						</div>
					</Grid>
				</Grid>
			</div>
		</>
	);
};

export default Userbox;

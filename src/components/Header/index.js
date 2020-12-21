import React from 'react';
import useStyles from '../../theme/useStyles';
import TopMenu from '../TopMenu'
import MobileMenu from '../MobileMenu'
import { AppBar, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = (props) => {
	const classes = useStyles();
	
	return (
		<AppBar 
			elevation={1}
			position="fixed"
			color="inherit"
			className={classes.appBar}>
				<Toolbar>
					<div className="text-center py-2" style={{height: "76px"}}>
						<Link to="/" title="beacons.gg">
							<img alt="beacons.gg" src={logo} height={50} />
							<div className="app-nav-logo--text m-4" style={{display:"none"}}>
								<b>admin.beacons.gg</b>
							</div>
						</Link>
					</div>
					<TopMenu />
					<MobileMenu />
				</Toolbar>
		</AppBar>
	);
}

export default Header;
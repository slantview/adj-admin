import React from 'react';
import useStyles from '../../theme/useStyles';
import TopMenu from '../TopMenu'
import MobileMenu from '../MobileMenu'
import { AppBar, Toolbar } from '@material-ui/core';

const Header = (props) => {
	const classes = useStyles();
	const { hidden } = props;
	
	return (
		<>
			{ !hidden &&
				<AppBar 
					elevation={1}
					position="relative"
					color="inherit"
					className={classes.appBar}>
						<Toolbar>
							<TopMenu />
							<MobileMenu />
						</Toolbar>
				</AppBar>
			}
		</>
	);
}

export default Header;
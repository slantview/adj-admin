import React from 'react';
import useStyles from '../../theme/useStyles';
import TopMenu from '../TopMenu'
import MobileMenu from '../MobileMenu'
import { AppBar, Toolbar } from '@material-ui/core';
import SiteSelector from '../SiteSelector';

const Header = (props) => {
	const classes = useStyles();
	const { hidden } = props;
	
	return (
		<>
			{ !hidden &&
				<AppBar 
					elevation={1}
					position="fixed"
					color="inherit"
					className={classes.appBar}>
						<Toolbar>
							<div className="text-center py-2 mr-2">
								<SiteSelector />
							</div>
							
							<TopMenu />
							<MobileMenu />
						</Toolbar>
				</AppBar>
			}
		</>
	);
}

export default Header;
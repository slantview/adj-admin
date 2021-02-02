import React from 'react';
import {
  Grid,
  Container,
  TextField,
  InputBase,
  InputAdornment,
  Divider
} from '@material-ui/core';

const SiteAddForm = () => {
    return (
		<Container>
			<div className="p-4">
				<h5 className="font-size-xl mb-1 font-weight-bold">
				Events Site
				</h5>
				<p className="text-black-50 mb-4">
					Choose a URL for your site. This will be your events site hosted on beacons.gg. If you would like to 
					use a custom domain, please contact us.
				</p>
				<Grid container spacing={6}>
				<Grid item md={12} lg={12}>
					<Grid item md={12} lg={12}>
						<TextField
							name="siteUrl"
							fullWidth
							label="Site URL"
							defaultValue="orgname"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start" disableTypography={true}>
										https://
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end" disableTypography={true}>
										.beacons.gg
									</InputAdornment>
								)
							  }}
						/>
					</Grid>
				</Grid>
				</Grid>
			</div>
		</Container>
    );
  };

  export default SiteAddForm;
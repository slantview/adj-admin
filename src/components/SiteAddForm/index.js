import { Grid, InputAdornment } from '@material-ui/core';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';

const SiteAddForm = (props) => {
    return (
		<div className="p-4">
			<p className="text-black-50 mb-4">
				Choose a URL for your site. This will be your events site hosted on beacons.gg. If you would like to 
				use a custom domain, please contact us.
			</p>
			<Grid container spacing={6}>
				<Grid item md={12} lg={12}>
					<Grid item md={12} lg={12}>
						<Field
							component={TextField}
							name="siteUrl"
							fullWidth
							label="Site URL"
							placeholder="orgname"
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
    );
  };

  export default SiteAddForm;
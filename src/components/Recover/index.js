import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Button,
  TextField,
  InputAdornment
} from '@material-ui/core';
import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';
import hero from '../../assets/images/hero-bg/hero-arena.jpg';
import logo from '../../assets/images/logo.png';

export default function Recover() {
	const [checked1, setChecked1] = useState(true);

	const handleChange1 = (event) => {
	  setChecked1(event.target.checked);
	};
	return (
		<>
		<div className="app-wrapper min-vh-100 bg-white">
			<div className="app-main min-vh-100">
			<div className="app-content p-0">
				<div className="app-inner-content-layout--main">
				<div className="flex-grow-1 w-100 d-flex align-items-center">
					<div className="bg-composed-wrapper--content">
					<Grid container spacing={0} className="min-vh-100">
                    <Grid
                      item
                      lg={7}
                      xl={6}
                      className="d-flex align-items-center">
                      <Grid item md={10} lg={8} xl={7} className="mx-auto">
						<div className="py-4">
							<div className="text-center mb-5">
								<div className="my-4">
									<img alt="beacons.gg" src={logo} height={60} />
								</div>

								<h1 className="display-4 mb-1 font-weight-bold">
									Recover Password
								</h1>
								<p className="font-size-lg mb-0 text-black-50">
									Forgot your password? No worries, we're here to help!
								</p>
							</div>
							<div>
								<TextField
									fullWidth
									variant="outlined"
									id="textfield-email"
									label="Email address"
									InputProps={{
										startAdornment: (
										<InputAdornment position="start">
											<MailOutlineTwoToneIcon />
										</InputAdornment>
										)
									}}
								/>
							</div>
							<div className="text-center mb-4">
								<Button
									fullWidth
									className="text-uppercase font-weight-bold font-size-sm mt-4 btn-primary">
									Send password
								</Button>
							</div>
							</div>
                      </Grid>
                    </Grid>
						<Grid item lg={5} xl={6} className="d-flex">
						<div className="hero-wrapper w-100 bg-composed-wrapper min-vh-lg-100">
							<div className="flex-grow-1 w-100 d-flex align-items-center">
								<div className="bg-composed-wrapper--image opacity-8" style={{ backgroundImage: 'url(' + hero + ')' }} />
								<div className="bg-composed-wrapper--bg bg-white opacity-6" />
								<div className="bg-composed-wrapper--bg bg-beacons opacity-6" />
							<div className="bg-composed-wrapper--content text-center p-5">
								<div className="text-white px-0 px-lg-2 px-xl-4">
								<h1 className="display-3 mb-4 font-weight-bold">
									The tools you need to grow your events
								</h1>
								<p className="font-size-lg mb-0 opacity-8">
									Let's get started.
								</p>
								<div className="divider mx-auto border-1 my-5 border-light opacity-2 rounded w-25" />
								</div>
							</div>
							</div>
						</div>
						</Grid>
					</Grid>
					</div>
				</div>
				</div>
			</div>
			</div>
		</div>
		</>
	);
}

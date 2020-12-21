import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Button,
  List,
  ListItem,
  Tooltip,
  TextField
} from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

import hero from '../../assets/images/hero-bg/hero-arena.jpg';
import logo from '../../assets/images/logo.png';

export default function Register() {
	const { loginWithRedirect } = useAuth0();
	return (
		<>
		<div className="app-wrapper min-vh-100 bg-white">
			<div className="app-main min-vh-100">
			<div className="app-content p-0">
				<div className="app-inner-content-layout--main">
				<div className="flex-grow-1 w-100 d-flex align-items-center">
					<div className="bg-composed-wrapper--content">
					<Grid container spacing={0} className="min-vh-100">
						<Grid item lg={7} xl={6} className="d-flex align-items-center">
						<Grid item md={10} lg={8} xl={7} className="mx-auto">
							<div className="py-4">
							<div className="text-center">
								<div className="my-4">
									<img alt="beacons.gg" src={logo} height={60} />
								</div>
								<h3 className="display-4 mb-2 font-weight-bold">
								Create account
								</h3>
								<p className="font-size-lg mb-5 text-black-50">
								Start growing your events. Sign up to start using Beacons today.
								</p>
							</div>
							<div className="mb-3">
								<label className="font-weight-bold mb-2">
								Full Name
								</label>
								<TextField
								variant="outlined"
								size="small"
								fullWidth
								placeholder="Enter your full name"
								/>
							</div>
							<div className="mb-3">
								<label className="font-weight-bold mb-2">
								Email address
								</label>
								<TextField
								name="email"
								variant="outlined"
								size="small"
								fullWidth
								placeholder="Enter your email address"
								type="email"
								/>
							</div>
							<div className="mb-3">
								<div className="d-flex justify-content-between">
								<label className="font-weight-bold mb-2">
									Password
								</label>
								</div>
								<TextField
								name="password"
								variant="outlined"
								size="small"
								fullWidth
								placeholder="Enter your password"
								type="password"
								className="mb-2"
								/>
								<TextField
								name="password2"
								variant="outlined"
								size="small"
								fullWidth
								placeholder="Enter your password again"
								type="password"
								/>
							</div>
							<div className="form-group mb-5">
								By clicking the <strong>Create account</strong>{' '}
								button below you agree to our terms of service and
								privacy statement.
							</div>

							<Button
								size="large"
								fullWidth
								className="btn-primary mb-3">
								Create Account
							</Button>
							</div>
							<div className="text-center">
								<span>Already have an account? </span>
								<a 
									className="text-first"
									onClick={() => loginWithRedirect()}>
										Sign-in now
								</a>
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
									Register today to start growing your events
								</h1>
								<p className="font-size-lg mb-0 opacity-8">
									Beacons helps you grow your events.
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

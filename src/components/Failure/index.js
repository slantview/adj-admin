import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import hero from '../../assets/images/hero-bg/hero-arena.jpg';

const Failure = () => {
	return (
		<>
		<div className="app-wrapper min-vh-100 bg-white">
			<div className="app-main min-vh-100">
			<div className="app-content p-0">
				<div className="app-inner-content-layout--main">
				<div className="flex-grow-1 w-100 d-flex align-items-center">
					<div className="bg-composed-wrapper--content">
					<Grid container spacing={0} className="min-vh-100">
						<Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="d-flex">
						<div className="hero-wrapper w-100 bg-composed-wrapper min-vh-lg-100">
							<div className="flex-grow-1 w-100 d-flex align-items-center">
								<div className="bg-composed-wrapper--image opacity-8" style={{ backgroundImage: 'url(' + hero + ')' }} />
								<div className="bg-composed-wrapper--bg bg-white opacity-6" />
								<div className="bg-composed-wrapper--bg bg-beacons opacity-6" />
							<div className="bg-composed-wrapper--content text-center p-5">
								<div className="text-white px-0 px-lg-2 px-xl-4">
								<h1 className="display-3 mb-4 font-weight-bold">
									You Died
								</h1>
								<p className="font-size-lg mb-0 ">
                                    Something has gone very wrong. Sorry about that.<br/>If this continues, please contact support for help.
								</p>
                                <p>
									<Button 
										component={Link}
										className="btn btn-primary mt-4"
										to="/login">
										Click here to return to the login page
									</Button>
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
};

export default Failure;

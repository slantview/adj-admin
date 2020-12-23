import React, { useState } from 'react';
import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { auth } from '../../utils/firebase';
import { useHistory } from 'react-router-dom';
import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import hero from '../../assets/images/hero-bg/hero-arena.jpg';
import logo from '../../assets/images/logo.png';

export default function Register() {
	const history = useHistory();

	const [checked1, setChecked1] = useState(true);
	const handleChange1 = (event) => {
	  setChecked1(event.target.checked);
	};

	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	
    const signInHandler = (event) => {
		auth.signInWithEmailAndPassword(email, password)
			.then(result => {
				history.push('/');
			})
			.catch(error => {
				setError("Error signing in with password and email!");
				console.error("Error signing in with password and email", error);
			});
        event.preventDefault();
	};

	const onChangeHandler = (event) => {
		const {name, value} = event.currentTarget;

		if(name === 'email') {
			setEmail(value);
		}
		else if(name === 'password'){
		  	setPassword(value);
		}
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
										<div className="text-center">
											<Link
												to="/"
												title="beacons.gg"
												className="">
													<img alt="beacons.gg" src={logo} height={60} />
													<div className="app-nav-logo--text" style={{display:"none"}}>
														<b>admin.beacons.gg</b>
													</div>
											</Link>
											<div className="divider my-5" />
										</div>
										<div>
											<div className="mb-4">
											<TextField
												name="email"
												value={email}
												fullWidth
												variant="outlined"
												id="textfield-email"
												label="Email address"
												onChange={onChangeHandler}
												InputProps={{
												startAdornment: (
													<InputAdornment position="start">
													<MailOutlineTwoToneIcon />
													</InputAdornment>
												)
												}}
											/>
											</div>
											<div className="mb-3">
												<TextField
													name="password"
													value={password}
													fullWidth
													variant="outlined"
													id="textfield-password"
													label="Password"
													type="password"
													onChange={onChangeHandler}
													InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															<LockTwoToneIcon />
														</InputAdornment>
													)
													}}
												/>
											</div>
											<div className="d-flex justify-content-between align-items-center font-size-md">
												<FormControlLabel
													control={
													<Checkbox
														checked={checked1}
														onChange={handleChange1}
														value="checked1"
														color="primary"
													/>
													}
													label="Remember me"
												/>
												<div>
													<Link
														to="/recover"
														className="text-first">
															Recover password
													</Link>
												</div>
											</div>
											<div className="text-center py-4">
												<Button 
													onClick={signInHandler} 
													className="btn-primary font-weight-bold w-50 my-2">
														Sign in
												</Button>
											</div>
											<div className="text-center text-black-50 mt-3">
												Don't have an account?{' '}
												<Link
													to="/register"
													className="text-first">
													Sign up
												</Link>
											</div>
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

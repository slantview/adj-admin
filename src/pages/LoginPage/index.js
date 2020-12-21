import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Container,
    Grid,
    InputAdornment,
    FormControlLabel,
    Checkbox,
    Button,
    TextField,
	Link
} from '@material-ui/core';
import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import logo from '../../assets/images/logo.png';
import LoginButton from '../../components/LoginButton';

export default function LoginPage() {
  const [checked1, setChecked1] = useState(true);

  const handleChange1 = (event) => {
    setChecked1(event.target.checked);
  };

  return (
    <Container>
		<div className="app-wrapper bg-white min-vh-100">
			<div className="app-main min-vh-100">
				<div className="app-content p-0">
					<div className="app-content--inner d-flex align-items-center">
						<div className="flex-grow-1 w-100 d-flex align-items-center">
							<div className="bg-composed-wrapper--content py-5">
								<Grid item md={10} lg={4} xl={4} className="mx-auto">
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
										<LoginButton size="large" />
									</div>
								</Grid>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    </Container>
  );
}

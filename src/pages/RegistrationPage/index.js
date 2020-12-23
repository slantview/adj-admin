import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import Loading from '../../components/Loading';
import RegisterPage1 from '../../components/RegisterPage1';
import RegistrationStepper from '../../containers/RegistrationStepper';

export default function Login() {
	const [profile, setProfile] = useState({});
	const [page, setPage] = useState(1);
	const submit = () => {
		setPage(page+1);
	}
	const handleChange = (e) => {
		profile[e.target.name] = e.target.value;
		setProfile(profile);
		console.log(profile);
	}
	return (
		<>
			{ page === 1 &&
				<RegisterPage1 profile={profile} handleChange={handleChange} submit={submit} />
			}
			{ page === 2 &&
				<RegistrationStepper />	
			}
		</>
		
	);
}

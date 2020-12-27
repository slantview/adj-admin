import React, { useState } from 'react';
import RegisterPage1 from '../../components/RegisterPage1';
import RegistrationStepper from '../../containers/RegistrationStepper';
import { registerUser } from '../../utils/api';
import { auth } from '../../utils/firebase';
import _ from 'lodash';

export default function Register() {
	const [page, setPage] = useState(1);

	const submit = (values, { setErrors }) => {
		return registerUser(values)
			.then(async response => {
				const userData = await response.json();
				if (response.ok) {
					auth.signInWithEmailAndPassword(values.email, values.password)
						.then(result => {
							setPage(page+1);
						})
						.catch(e => {
							setErrors({api: _.get(e, ["message"])});
							console.error("Error authenticating with password and email", e);
						});
					return true;
				} else {
					setErrors({api: _.get(userData, ["error"])});
					return false;
				}
			})
			.catch(e => {
				setErrors({api: _.get(e, ["error"])});
				return false;
			});
	}


	return (
		<>
			{ page === 1 &&
				<RegisterPage1 submit={submit} />
			}
			{ page === 2 &&
				<RegistrationStepper />	
			}
		</>
		
	);
}

import React, { useState } from 'react';
import { 
	Card, 
	CardContent
 } from '@material-ui/core';
import Loading from '../../../components/Loading';
import UserAddForm from './UserAddForm';
import { registerUser } from '../../../utils/api';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

export default function UsersListPage() {
    const [isLoading, setLoading] = useState(false);
	const [notification, setNotification] = useState(null);
	const history = useHistory();

    const submit = (values, { setErrors }) => {
		return registerUser(values)
			.then(async response => {
				const userData = await response.json();
				if (response.ok) {
					setNotification("User successfully added.")
					history.push("/admin/users")
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

	if (isLoading) {
		return (<Loading centerInPage={true} center={true} />);
	}

	return (
		<>
			<Card className="card-box mb-spacing-6-x2">
				<div className="card-header">
					<div className="card-header--title">
						<small className="d-block text-uppercase mt-1">User</small>
                        <b>Add User</b>
					</div>

					<div className="card-header--actions">
					
					</div>
				</div>
				<CardContent className="px-0 pt-2 pb-3">
					<UserAddForm submit={submit} />
				</CardContent>
			</Card>
		</>
	);
}

import { Card, CardContent, Grid } from '@material-ui/core';
import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import SectionHeader from 'components/SectionHeader';
import { NotificationContext } from 'providers/NotificationProvider';

import Loading from '../../../components/Loading';
import { registerUser } from '../../../utils/api';
import UserAddForm from './UserAddForm';

export default function UsersListPage() {
	const notify = useContext(NotificationContext).notify;
	const history = useHistory();

	const [isLoading] = useState(false);

    const submit = (values, { setErrors }) => {
		return registerUser(values)
			.then(async response => {
				const userData = await response.json();
				if (response.ok) {
					notify({
						type: 'success',
						message: "User successfully added."
					});
					history.push("/admin/users")
					return true;
				} else if (response.status === 401) {
                    window.location.pathname = '/login';
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
			<SectionHeader 
				title="Add User"
				titleColor="text-white"
				subtitle="Manage users and groups."
				subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
				linkText="Add User"
				linkTo="/admin/users/add"
				linkIconName="plus"
				breadcrumbs={[
                    { title: "Home", to: "/" },
					{ title: "Users", to: "/admin/users" },
					{ title: "Add User", to: null }
                ]}
			/>
		 	<div className="mx-4 mt-4">
                <Grid container>
					<Grid item md={12} lg={12} xl={12}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Add User</h3>
                    </Grid>
					<Grid item md={12} lg={12} xl={12} className="mt-3">
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
					</Grid>
				</Grid>
			</div>
		</>
	);
}

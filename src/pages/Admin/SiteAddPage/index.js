import { Button, Card, CardActions, CardContent, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import * as Yup from 'yup';

import Error from 'components/Error';
import FormSubmitButton from 'components/FormSubmitButton';
import Loading from 'components/Loading';
import SectionHeader from 'components/SectionHeader';
import SiteAddForm from 'components/SiteAddForm';
import { NotificationContext } from 'providers/NotificationProvider';
import { SiteContext } from 'providers/SiteProvider';
import { UserContext } from 'providers/UserProvider';
import { createSite } from 'utils/api';

// import blockedWords from './blocked_words';

const initialData = {
	siteUrl: ''
};
const urlSuffix = ".beacons.gg";
// const blockedWordsRegex = new RegExp(`^((?!${blockedWords.join('|')}).)*$`);
const validationSchema = Yup.object({
	siteUrl: Yup.string()
		// TODO(smfr): Turn off until we can do this better.
		// .matches(blockedWordsRegex, 'Site name not allowed.')
		.required("Site URL is required.")
});

const SiteAddPage = (props) => {
	const userCtx = useContext(UserContext);
	const siteCtx = useContext(SiteContext);
	const notify = useContext(NotificationContext).notify;
	const history = useHistory();
	
	const [isSubmitted, setSubmitted] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = (values, actions) => {
		setSubmitted(true);

		const siteName = values.siteUrl.toLowerCase();

		createSite({name: siteName}, userCtx.token)
			.then(resp => {
				if (resp.ok) {
					siteCtx.refetchSites();
					notify({
						type: 'success',
						message: `Successfully created ${siteName}.${urlSuffix}.`
					});
					history.push('/admin/sites');
				} else if (resp.status === 409) {
					setError('Site name already exists.')
					actions.setSubmitting(false);
					actions.resetForm();
				} else {
					setError('An error occurred adding site.')
				}
				
			})
			.catch(e => {
				setError(e.toString());
			});
	}

    return (
		<>
			<SectionHeader 
				title="Add New Site"
				titleColor="text-white"
				backgroundStyle='bg-beacons-gradient'
				breadcrumbs={[
					{ title: "Home", to: "/" },
					{ title: "Sites", to: "/admin/sites" },
					{ title: "Add Site", to: null }
				]}
			/>
			 <div className="mx-4 mt-4">
                <Grid container>
					<Grid item md={6} lg={6} xl={6}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Create New Site</h3>
                    </Grid>
					<Grid item md={12} lg={12} xl={12} className="mt-3">
						<Formik
							initialValues={initialData}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}>
								{(FormProps) => (
									<Form id="organization-add-form"> 
										<Card className="card-box mb-spacing-6-x2">
											<CardContent className="px-0 pt-2 pb-3">
												{ error &&
													<Error message={error} />
												}
												{ (FormProps.isSubmitting || isSubmitted) && !error ? (
													<div className="text-center m-5">
														<Loading center={true} />
														<h3 className="mt-3">Creating site {FormProps.values.siteUrl}{urlSuffix}...</h3>
													</div>
												) : (
													<div>
														<SiteAddForm {...FormProps} />
													</div>
												)}
											</CardContent>
											<CardActions className="px-4 py-2 mb-2">
												{ !FormProps.isSubmitting &&
													<FormSubmitButton
														showNotificationOnError={true}
														title="Create Site"
														errors={FormProps.errors}
													/>
												}
											</CardActions>
										</Card>
									</Form>
								)}
						</Formik>
					</Grid>
                </Grid>
            </div>
		</>
    )
}

export default SiteAddPage;

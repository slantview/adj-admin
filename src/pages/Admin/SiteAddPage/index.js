import { Button, ButtonGroup, Card, CardActions, CardContent } from '@material-ui/core';
import Error from 'components/Error';
import Loading from 'components/Loading';
import SiteAddForm from 'components/SiteAddForm';
import { Form, Formik } from 'formik';
import { UserContext } from 'providers/UserProvider';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { createSite } from 'utils/api';
import * as Yup from 'yup';
import blockedWords from './blocked_words';

const initialData = {
	siteUrl: ''
};
const urlSuffix = ".beacons.gg";
const blockedWordsRegex = new RegExp(`^((?!${blockedWords.join('|')}).)*$`);
const validationSchema = Yup.object({
	siteUrl: Yup.string()
		// TODO(smfr): Turn off until we can do this better.
		// .matches(blockedWordsRegex, 'Site name not allowed.')
		.required("Site URL is required.")
});

const SiteAddPage = (props) => {
	const {
		setNotification
	} = props;

	const userCtx = useContext(UserContext);
	const history = useHistory();
	const [isSubmitted, setSubmitted] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = (values, actions) => {
		setSubmitted(true);

		const siteName = values.siteUrl.toLowerCase();

		createSite({name: siteName}, userCtx.token)
			.then(resp => {
				if (resp.status === 200) {
					setNotification({
						open: true,
						type: 'success',
						message: `Successfully created ${siteName}.${urlSuffix}.`
					}, false);
					history.push('/admin/sites');
				} else {
					setError('An error occurred adding site.')
				}
				
			})
			.catch(e => {
				setError(e.toString());
			});
	}

    return (
		<Formik
			initialValues={initialData}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}>
				{(FormProps) => (
					<Form id="organization-add-form"> 
						<Card className="card-box mb-spacing-6-x2">
							<div className="card-header">
								<div className="card-header--title">
									<small className="d-block text-uppercase mt-1">Site</small>
									<b>Add New Site</b>
								</div>
							</div>
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
									<Button
										name="submit"
										type="submit"
										disabled={FormProps.isSubmitting}
										className="btn btn-primary font-weight-bold">
											Create Site
									</Button>
								}
							</CardActions>
						</Card>
					</Form>
					)}
			</Formik>
    )
}

export default SiteAddPage;

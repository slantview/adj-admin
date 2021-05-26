import { Card, CardActions, CardContent, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import Error from 'components/Error';
import FormSubmitButton from 'components/FormSubmitButton';
import Loading from 'components/Loading';
import SectionHeader from 'components/SectionHeader';
import SiteEditForm from 'components/SiteEditForm';
import { NotificationContext } from 'providers/NotificationProvider';
import { SiteContext } from 'providers/SiteProvider';
import { UserContext } from 'providers/UserProvider';
import { updateSite } from 'utils/api';

const urlSuffix = ".beacons.gg";
// const blockedWordsRegex = new RegExp(`^((?!${blockedWords.join('|')}).)*$`);
const validationSchema = Yup.object({
	name: Yup.string().required("Site name is required"),
    domain: Yup.string().required("Site domain is required"),
});

const SiteEditPage = (props) => {
    // @ts-ignore
    const { siteId } = useParams();
	const userCtx = useContext(UserContext);
	const siteCtx = useContext(SiteContext);
	const notify = useContext(NotificationContext).notify;
	const history = useHistory();
	
	const [isSubmitted, setSubmitted] = useState(false);
	const [error, setError] = useState(null);

    const site = siteCtx.getSiteById(siteId);
    const initialData = {
        name: site.name,
        domain: site.domain,
        url: site.url,
        backend_domain: site.backend_domain,
        backend_url: site.backend_url,
        firebase_site: site.firebase_site,
        owners: site.owners
    };

	const handleSubmit = (values, actions) => {
		setSubmitted(true);

        let updateSiteData = {
            name: values.name,
            domain: values.domain,
            url: values.url,
            backend_domain: values.backend_domain,
            backend_url: values.backend_url,
            firebase_site: values.firebase_site,
            owners: values.owners.map(o => ({id: o.value}))
        };

        console.log(updateSiteData);
		
        updateSite(siteId, updateSiteData, userCtx.token)
            .then(async response => {
                const body = await response.json();
                if (response.ok) {
					siteCtx.refetchSites();
					notify({
						type: 'success',
						message: `Successfully updated ${updateSiteData.name}.`
					});
					history.push('/admin/sites');
				} else if (response.status !== 200) {
					setError('Error updating site: ' + body.message)
					actions.setSubmitting(false);
					actions.resetForm();
				} else {
					setError('An error occurred adding site.')
				}
            })
            .catch(e => {
                setError(e);
            })
	}

    return (
		<>
			<SectionHeader 
				title="Edit Site"
				titleColor="text-white"
				backgroundStyle='bg-beacons-gradient'
				breadcrumbs={[
					{ title: "Home", to: "/" },
					{ title: "Sites", to: "/admin/sites" },
					{ title: "Edit Site", to: null }
				]}
			/>
			 <div className="mx-4 mt-4">
                <Grid container>
					<Grid item md={6} lg={6} xl={6}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Edit Site</h3>
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
														<h3 className="mt-3">Updating site {FormProps.values.siteUrl}{urlSuffix}...</h3>
													</div>
												) : (
													<div>
														<SiteEditForm {...FormProps} />
													</div>
												)}
											</CardContent>
											<CardActions className="px-4 py-2 mb-2">
												{ !FormProps.isSubmitting &&
													<FormSubmitButton
														showNotificationOnError={true}
														title="Update Site"
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

export default SiteEditPage;

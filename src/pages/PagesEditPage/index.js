import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Error from 'components/Error';
import Loading from 'components/Loading';
import PageEditForm from 'components/PageEditForm';
import SectionHeader from 'components/SectionHeader';
import { NotificationContext } from 'providers/NotificationProvider';
import { UPLOAD_FILE } from 'queries/files';
import { GET_ABOUT_PAGE, GET_EVENTS_LIST_PAGE, GET_GAMES_LIST_PAGE, GET_HOME_PAGE, UPDATE_ABOUT_PAGE, UPDATE_EVENTS_LIST_PAGE, UPDATE_GAMES_LIST_PAGE, UPDATE_HOME_PAGE } from 'queries/pages';

const PagesEditPage = (props) => {
    // @ts-ignore
    const { pageId } = useParams();

    const client = useApolloClient();
    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    
    let PAGE_GET_QUERY = null;
    let handleSubmit = (values, actions) => {};

    const [uploadFile] = useMutation(UPLOAD_FILE);

    const [updateHomePage] = useMutation(UPDATE_HOME_PAGE);
    const handleHomePageSubmit = async (values, actions) => {
        let updatedHomePage = {
            title: values.title,
            subtitle: values.subtitle,
            description: values.description,
        }
        
        actions.resetForm();
        setLoading(true);

        if (Array.isArray(values.header) && !_.first(values.header)?.id) {
            const headerResponse = await uploadFile({ 
                variables: { 
                    file: values.header[0]
                }
            });
            updatedHomePage.header = headerResponse.data.upload.id;
        }

        updateHomePage({
            variables: {
                data: updatedHomePage
            }
        })
        .then(result => {
            const updatedHomePage = result.data.updateHomePage.homePage;
            client.resetStore()
                .then(() => {
                    notify({
                        type: 'success',
                        message: "Successfully updated page: " + updatedHomePage.title
                    });
                    history.push('/pages');
                });
        })
        .catch(e => {
            console.error(e);
        })
    };

    const [updateAboutPage] = useMutation(UPDATE_ABOUT_PAGE);
    const handleAboutPageSubmit = async (values, actions) => {
        let updatedAboutPage = {
            title: values.title,
            subtitle: values.subtitle,
            description: values.description,
        };
        actions.resetForm();
        setLoading(true);

        if (Array.isArray(values.header) && !_.first(values.header)?.id) {
            const headerResponse = await uploadFile({ 
                variables: { 
                    file: values.header[0]
                }
            });
            updatedAboutPage.header = headerResponse.data.upload.id;
        } 

        updateAboutPage({
            variables: {
                data: updatedAboutPage
            }
        })
        .then(result => {
            const updatedAboutPage = result.data.updateAboutPage.aboutPage;
            client.resetStore()
                .then(() => {
                    notify({
                        type: 'success',
                        message: "Successfully updated page: " + updatedAboutPage.title
                    });
                    history.push('/pages');
                });
        })
        .catch(e => {
            console.error(e);
        })
    };

    const [updateEventsListPage] = useMutation(UPDATE_EVENTS_LIST_PAGE);
    const handleEventsListPageSubmit = async (values, actions) => {
        let updatedEventsListPage = {
            title: values.title,
            subtitle: values.subtitle,
            description: values.description,
        };
        actions.resetForm();
        setLoading(true);

        if (Array.isArray(values.header) && !_.first(values.header)?.id) {
            const headerResponse = await uploadFile({ 
                variables: { 
                    file: values.header[0]
                }
            });
            updatedEventsListPage.header = headerResponse.data.upload.id;
        } 

        updateEventsListPage({
            variables: {
                data: updatedEventsListPage
            }
        })
        .then(result => {
            const updatedEventsListPage = result.data.updateEventsListPage.eventsListPage;
            client.resetStore()
                .then(() => {
                    notify({
                        type: 'success',
                        message: "Successfully updated page: " + updatedEventsListPage.title
                    });
                    history.push('/pages');
                });
        })
        .catch(e => {
            console.error(e);
        })
    };

    const [updateGamesListPage] = useMutation(UPDATE_GAMES_LIST_PAGE);
    const handleGamesListPageSubmit = async (values, actions) => {
        let updatedGamesListPage = {
            title: values.title,
            subtitle: values.subtitle,
            description: values.description,
        };
        actions.resetForm();
        setLoading(true);

        if (Array.isArray(values.header) && !_.first(values.header)?.id) {
            const headerResponse = await uploadFile({ 
                variables: { 
                    file: values.header[0]
                }
            });
            updatedGamesListPage.header = headerResponse.data.upload.id;
        }

        updateGamesListPage({
            variables: {
                data: updatedGamesListPage
            }
        })
        .then(result => {
            const updatedGamesListPage = result.data.updateGamesListPage.gamesListPage;
            client.resetStore()
                .then(() => {
                    notify({
                        type: 'success',
                        message: "Successfully updated page: " + updatedGamesListPage.title
                    });
                    history.push('/pages');
                });
        })
        .catch(e => {
            console.error(e);
        })
    };

    switch (pageId) {
        case 'home-page':
            PAGE_GET_QUERY = GET_HOME_PAGE;
            handleSubmit = handleHomePageSubmit;
            break;
        case 'about-page': 
            PAGE_GET_QUERY = GET_ABOUT_PAGE;
            handleSubmit = handleAboutPageSubmit;
            break;
        case 'events-list-page':
            PAGE_GET_QUERY = GET_EVENTS_LIST_PAGE;
            handleSubmit = handleEventsListPageSubmit;
            break;
        case 'games-list-page':
            PAGE_GET_QUERY = GET_GAMES_LIST_PAGE;
            handleSubmit = handleGamesListPageSubmit;
        default:
            PAGE_GET_QUERY = GET_HOME_PAGE;
            handleSubmit = handleHomePageSubmit;
    }

    const { loading, error, data, refetch } = useQuery(
		PAGE_GET_QUERY,
		{ 
			notifyOnNetworkStatusChange: true 
		});

    const [pageData, setPageData] = useState(null);
    const [isLoading, setLoading] = useState(loading);

    useEffect(() => {
        if (!loading) {
            switch (pageId) {
                case 'home-page':
                    setPageData(data?.homePage);
                    break;
                case 'about-page': 
                    setPageData(data?.aboutPage);
                    break;
                case 'events-list-page':
                    setPageData(data?.eventsListPage);
                    break;
                case 'games-list-page':
                    setPageData(data?.gamesListPage);
            }
            setLoading(loading);
        }
    }, [loading, error, data]);

    if (isLoading) {
        return (<Loading center={true} centerInPage={true} />)
    }

    if (error) {
        return (<Error message={error} />);
    }
    
    return (
		<>
			<SectionHeader 
				title="Edit Page"
				titleColor="text-white"
				subtitle="Edit the details for this page."
				subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
				breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Pages", to: "/pages" },
                    { title: pageData?.title, to: null }
                ]}
			/>
			
			<div className="mx-4 mt-4">
				<Grid container>
					<Grid item md={6} lg={6} xl={6}>
						<h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Edit Page</h3>
					</Grid>
					
					<Grid item  md={12} lg={12} xl={12} className="mt-3">
						<PageEditForm pageData={pageData} handleSubmit={handleSubmit} />
					</Grid>
				</Grid>
			</div>
		</>
	);
}

export default PagesEditPage;

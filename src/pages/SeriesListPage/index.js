import { NetworkStatus, useQuery } from '@apollo/client';
import { Button, Grid, Snackbar } from '@material-ui/core';
import RefreshTwoToneIcon from '@material-ui/icons/RefreshTwoTone';
import React, { useState } from 'react';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { GET_ALL_SERIES } from '../../queries/series';
import AddNewSeriesCard from './AddNewSeriesCard';
import SeriesListItem from './SeriesListItem';

export default function SeriesListPage() {
	const { loading, error, data, refetch, networkStatus } = useQuery(
		GET_ALL_SERIES, 
		{ 
			notifyOnNetworkStatusChange: true 
		});
	const seriesData = loading || error ? [] : data ? data.seriesItems : [];
	const [isLoading, setLoading] = React.useState(loading);
	const [series, setSeries] = React.useState(seriesData);
	const isRefetching = networkStatus === NetworkStatus.refetch;

	const [notification, setNotification] = useState({
        open: false,
        type: '',
        message: ''
    });
    const setNotificationWrapper = (update, updateUsers) => {
        setNotification(update);
        if (!isLoading && updateUsers) {
            setLoading(true);
        }
    };
	const handleClose = () => {
        setNotification({ ...notification, open: false });
    };

	const refreshSeries = () => {
		setLoading(true);
		setSeries([]);
		refetch();
	};

	React.useEffect(() => {
		if (isLoading && !loading) {
			setLoading(loading);
			setSeries(seriesData);
		}
	}, [loading, data, error]);

	if (loading) {
		return (<Loading centerInPage={true} center={true} />);
	}

	if (error) {
		return (<Error message={error.message} />)
	}

	return (
		<>
			<div>
				<Grid container>
					<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
						<h2>Events</h2>
						<p>See all series, events, and tournaments.</p>
					</Grid>
					<Grid item xs={6} sm={6} md={6} lg={6} xl={6} className="text-right">
						<Button component="a" onClick={() => refreshSeries() } size="small" className="btn-neutral-primary mr-2">
							<span className="btn-wrapper--icon">
								<RefreshTwoToneIcon fontSize="medium" />
							</span>
						</Button>
					</Grid>
				</Grid>
				{ series.length === 0 &&
					<AddNewSeriesCard />
				}

				{ series.length > 0 && series.map(item => (
					<SeriesListItem 
						key={item.id}  
						setLoading={setLoading} 
						setNotification={setNotificationWrapper} 
						refreshSeries={refreshSeries}
						{...item}
					/>
				))}
			</div>
			<Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center' }}
                key="notification"
                autoHideDuration={5000}
                open={notification.open}
                classes={{ root: 'toastr-' + notification.type }}
                onClose={handleClose}
                message={notification.message}
            />
		</>
	);
}

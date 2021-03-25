import { useQuery } from '@apollo/client';
import React from 'react';

import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { GET_ALL_SERIES } from '../../queries/series';
import AddNewSeriesCard from './AddNewSeriesCard';
import SeriesListItem from './SeriesListItem';

export default function SeriesListPage() {
	const { loading, error, data } = useQuery(GET_ALL_SERIES);
	const seriesData = loading || error ? [] : data ? data.seriesItems : [];
	const [isLoading, setLoading] = React.useState(loading);

	const [entries, setEntries] = React.useState(5);
	const handleEntriesChange = (e) => {
		setEntries(e.target.value);
	};
	const [page, setPage] = React.useState(1);
	const handlePageChange = (event, page) => {
		setPage(page);
	};
	const [search, setSearch] = React.useState(null);
	const [series, setSeries] = React.useState(seriesData);


	React.useEffect(() => {
		if (isLoading && !loading) {
			setLoading(loading);
			setSeries(seriesData);
		}
	}, [loading]);

	if (loading) {
		return (<Loading centerInPage={true} center={true} />);
	}

	if (error) {
		return (<Error message={error.message} />)
	}

	return (
		<>
			<div>
				<div>
					<h2>Events</h2>
					<p>See all series, events, and tournaments.</p>
				</div>
				{ series.length === 0 &&
					<AddNewSeriesCard />
				}

				{ series.length > 0 && series.map(item => (
					<SeriesListItem {...item} setLoading={setLoading} />
				))}
			</div>
		</>
	);
}

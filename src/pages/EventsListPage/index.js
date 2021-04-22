import { useQuery } from '@apollo/client';
import EventsList from 'components/EventsList';
import React from 'react';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { GET_ALL_EVENTS } from '../../queries/events';

export default function EventsListPage() {
	const { loading, error, data } = useQuery(GET_ALL_EVENTS);
	const eventData = loading || error ? [] : data ? data.events : [];

	if (loading) {
		return (<Loading centerInPage={true} center={true} />);
	}

	if (error) {
		return (<Error message={error.message} />)
	}

	return (
		<>
			<EventsList events={eventData} />
		</>
	);
}

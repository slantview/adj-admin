import { useQuery } from '@apollo/client';
import EventEditForm from 'components/EventEditForm';
import Loading from 'components/Loading';
import SectionHeader from 'components/SectionHeader';
import { GET_EVENT } from 'queries/events';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const EventsEditPage = (props) => {
    // @ts-ignore
    const { eventId } = useParams();
    const { loading, error, data } = useQuery(GET_EVENT, { 
        variables: {
            id: eventId
        }
    });
    const [eventData, setEventData] = useState(data)
    const series = eventData?.series_item;

    useEffect(() => {
        if (!loading) {
            setEventData(data?.event);
        }
    }, [loading, error, data])
    
    if (loading) {
        return (<Loading centerInPage={true} center={true} />);
    }

    return (
        <>
        <SectionHeader 
            title={"Edit "+eventData?.title}
            titleColor="text-white"
            backgroundStyle='bg-beacons-gradient'
            // backgroundImage={seriesData.header.formats.large.url}
            breadcrumbs={[
                { title: "Home", to: "/" },
                { title: "Events", to: "/events" },
                { title: series?.title, to: "/series/view/" + series?.id },
                { title: "Edit Event", to: null }
            ]}
            minHeight="10vh"
        />
        <div className="mt-3">
            <EventEditForm event={eventData} loading={loading} />
        </div>
    </>
    )
}

export default EventsEditPage;

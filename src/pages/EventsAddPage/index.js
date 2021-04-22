import { Container } from '@material-ui/core';
import EventAddForm from 'components/EventAddForm';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function SeriesAddPage() {
    // @ts-ignore
    const { seriesId } = useParams();

    return (
        <Container className="mt-3">
            <EventAddForm seriesId={seriesId} />
        </Container>
    );
}

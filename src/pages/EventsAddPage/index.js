import React from 'react';
import { useParams } from 'react-router-dom';

import EventAddForm from 'components/EventAddForm';

export default function SeriesAddPage() {
    // @ts-ignore
    const { seriesId } = useParams();

    return (
        <div>
            <EventAddForm seriesId={seriesId} />
        </div>
    );
}

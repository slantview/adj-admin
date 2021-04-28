import moment from 'moment-timezone';

export const getSortedEvents = (allEvents, timezone) => {
    if (allEvents === null || allEvents.length === 0) {
        return {
            upcoming: [],
            previous: [],
            unpublished: [],
            next: null
        };
    }

    const today = moment().tz(timezone);

    let nextEvent = null;
    const previousEvents = [];
    const unpublishedEvents = [];
    const upcomingEvents = [];

    allEvents.forEach(e => {
        const eventTime = moment(e.starts_at).tz(timezone);
        const nextEventTime =  nextEvent !== null ? moment(nextEvent.starts_at).tz(timezone) : null;

        if (eventTime?.isAfter(today)) {
            upcomingEvents.push(e);
            if (nextEvent === null) {
                nextEvent = e;
            } else if (nextEventTime.isAfter(eventTime)) {
                nextEvent = e;
            }
            return e;
        } else {
            previousEvents.push(e);
        }
        
        if (e.published_at !== null) {
            unpublishedEvents.push(e);
        }
    });

    return {
        upcoming: upcomingEvents,
        previous: previousEvents,
        unpublished: unpublishedEvents,
        next: nextEvent
    };

};
import {
    ApolloClient,

    HttpLink, InMemoryCache
} from '@apollo/client';
import moment from 'moment-timezone';
import slugify from 'slugify';

const httpLink = new HttpLink({ 
  	uri: 'http://localhost:8081/graphql'
});

export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
});

export const getClient = (backend, token) => {
    const httpAuthBackendLink = new HttpLink({ 
        uri: backend,
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const httpNoAuthBackendLink = new HttpLink({ 
        uri: backend,
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    return new ApolloClient({
        link: token ? httpAuthBackendLink : httpNoAuthBackendLink,
        cache: new InMemoryCache()
    });
};

export const eventToNewEvent = (event, values, timezone) => {
    // Adjust the time to the local timezone as set by the site.
    const value_starts_at = moment(values.starts_at).tz(timezone);
    const event_starts_at = moment(event.starts_at).tz(timezone);
    const starts_at =  moment(
        value_starts_at.format("YYYY-MM-DD ") +
        event_starts_at.format("HH:mm:00")
    ).tz(timezone).format();
    
    const value_ends_at = moment(values.ends_at).tz(timezone);
    const event_ends_at = moment(event.ends_at).tz(timezone);
    const ends_at = moment(
        value_ends_at.format("YYYY-MM-DD ") +
        event_ends_at.format("HH:mm:00")
    ).tz(timezone).format();

    return {
        title: values.title,
        slug: '/' + slugify(values.title, {
            replacement: '-', 
            lower: true,
            strict: true
        }),
        description: event.description,
        is_online: event.is_online,
        is_offline: event.is_offline,
        starts_at: starts_at,
        ends_at: ends_at,
        header: event.header.id,
        card: event.card.id,
        series_item: event.series_item.id,
        sign_up_link: values.sign_up_link,
        checkin_instructions: event.checkin_instructions,
        stream_rules: event.stream_rules,
        games: event.games ? event.games.map(g => g.id) : null,
        streams: event.streams ? event.streams.map(s => s.id) : null,
        venue: event.venue.id,
        cadence: event.cadence,
        tournaments: event.tournaments
    };
};

export const tournamentToNewTournament = (tournament, values, timezone) => {
    const value_starts_at = moment(values.starts_at).tz(timezone);
    const event_registration_cutoff = moment(tournament.registration_cutoff).tz(timezone);
    const registration_cutoff =  moment(
        value_starts_at.format("YYYY-MM-DD ") +
        event_registration_cutoff.format("HH:mm:00")
    ).tz(timezone).format();

    const original_start_time = moment(tournament.tournament_start_time).tz(timezone);
    const tournament_start_time =  moment(
        value_starts_at.format("YYYY-MM-DD ") +
        original_start_time.format("HH:mm:00")
    ).tz(timezone).format();

    return {
        title: tournament.title,
        description: tournament.description,
        header: tournament.header.id,
        registration_cap: tournament.registration_cap,
        registration_cutoff: registration_cutoff,
        tournament_start_time: tournament_start_time,
        fee: tournament.fee,
        matcherino_code: tournament.matcherino_code,
        matcherino_coupon_amount: tournament.matcherino_coupon_amount,
        game: tournament.game.id,
        game_rules: tournament.game_rules.map(g => g.id),
        platforms: tournament.platforms.map(p => p.id),
        geo_regions: tournament.geo_regions.map(g => g.id),
        game_mode: tournament.game_mode.map(g => g.id),
        bracket_format: tournament.bracket_format.map(b => b.id)
    };
};
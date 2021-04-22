import { gql } from '@apollo/client';

export const GET_ALL_EVENTS = gql`
    query {
        events(publicationState: PREVIEW) {
            id
            title
            slug
            description
            is_online
            is_offline
            series_item {
                id
            }
            sign_up_link
            checkin_instructions
            stream_rules
            venue {
                id
                name
            }
            cadence
            card {
                id
                formats
            }
            header {
                id
                formats
            }
            tournaments(
                where: {
                    _or: [
                        { published_at_null: true },
                        { published_at_null: false }
                    ]
            }) {
                id
                Title
                description
                header {
                    id
                    formats
                }
                registration_cap
                registration_cutoff
                tournament_start_time
                event {
                    id
                }
                fee
                matcherino_code
                matcherino_coupon_amount
                game {
                    id
                }
                game_rules {
                    id
                }
                platforms {
                    id
                }
                geo_regions {
                    id
                }
                game_mode {
                    id
                }
                bracket_format {
                    id
                }
            }
            games {
                id
            }
            starts_at
            ends_at
            created_at
            updated_at
            published_at
        }
    }
`;

export const CREATE_EVENT = gql`
    mutation CreateNewEvent($payload: createEventInput) {
        createEvent(input: $payload) {
            event {
                id
                title
                slug
                description
                is_online
                is_offline
                series_item {
                    id
                }
                sign_up_link
                checkin_instructions
                stream_rules
                venue {
                    id
                    name
                }
                cadence
                card {
                    id
                    formats
                }
                header {
                    id
                    formats
                }
                tournaments {
                    id
                    title
                }
                games {
                    id
                }
                starts_at
                ends_at
                created_at
                updated_at
                published_at
            }
        }
    }
`

export const CREATE_TOURNAMENT = gql`
    mutation CreateNewTournament($payload: createTournamentInput) {
        createTournament(input: $payload) {
           tournament {
               id
           }
        }
    }
`

export const DELETE_EVENT = gql`
    mutation DeleteEvent($id: ID!) {
        deleteEvent(input: { where: { id: $id } }) {
            event {
                id
                title
            }
        }
    }
`

export const DELETE_TOURNAMENT = gql`
    mutation DeleteTournament($id: Int!) {
        deleteTournament(input: { where: { id: $id } }) {
            tournament {
                id
                title
            }
        }
    }
`

export const UPDATE_EVENT = gql`
    mutation UpdateEvent($id: ID!, $data: editEventInput) {
        updateEvent(input: { 
            where: { id: $id },
            data: $data
        }) {
            event {
                id
                title
            }
        }
    }
`
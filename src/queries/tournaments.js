import { gql } from '@apollo/client';

export const GET_ALL_TOURNAMENTS = gql`
    query GetAllTournaments {
        tournaments(publicationState: PREVIEW) {
            id
            title
            description
            header {
                formats
            }
            registration_cap
            registration_cutoff
            tournament_start_time
            events {
                id
                title
                starts_at
            }
            fee
            matcherino_code
            matcherino_coupon_amount
            game {
                id
                title
                cover {
                    formats
                }
            }
            game_rules {
                id
                title
            }
            platforms {
                id
                name
                description
            }
            geo_regions {
                id
                title
                places_geo_regions {
                    id
                    title
                    type
                }
            }
            game_mode {
                id
                title
            }
            bracket_format {
                id
                title
            }
            created_at
            updated_at
            published_at
        }
    }
`;

export const GET_ALL_SERIES_TOURNAMENTS = gql`
    query GetAllTournamentsForSeries($serisId: String!) {
        tournaments(publicationState: PREVIEW) {
            id
            title
            description
            header {
                formats
            }
            registration_cap
            registration_cutoff
            tournament_start_time
            events {
                id
                title
                starts_at
            }
            fee
            matcherino_code
            matcherino_coupon_amount
            game {
                id
                title
            }
            game_rules {
                id
                title
            }
            platforms {
                id
                name
                description
            }
            geo_regions {
                id
                title
                places_geo_regions {
                    id
                    name
                    type
                }
            }
            game_mode {
                id
                title
            }
            bracket_format {
                id
                title
            }
            created_at
            updated_at
            published_at
        }
    }
`;


export const GET_TOURNAMENT = gql`
    query GetTournament($id: ID!) {
        tournament(id: $id) {
            id
            title
            description
            registration_cap
            registration_cutoff
            tournament_start_time
            events {
                id
                title
            }
            fee
            matcherino_code
            matcherino_coupon_amount
            game {
                id
                title
            }
            game_rules {
                id
                title
            }
            platforms {
                id
                name
                description
            }
            game_mode {
                id
                title
            }
            bracket_format {
                id
                title
            }
            geo_regions {
                id
                title
                places_geo_regions {
                    id
                    name
                    type
                }
            }
            created_at
            updated_at
            published_at
        }
    }
`;

export const CREATE_TOURNAMENT = gql`
    mutation CreateNewTournament($payload: createTournamentInput) {
        createTournament(input: $payload) {
           tournament {
               id
               title
           }
        }
    }
`

export const UPDATE_TOURNAMENT = gql`
     mutation UpdateTournament($id: ID!, $data: editTournamentInput) {
        updateTournament(input: { 
            where: { id: $id },
            data: $data
        }) {
            tournament {
               id
               title
           }
        }
    }
`

export const DELETE_TOURNAMENT = gql`
    mutation DeleteTournament($id: ID!) {
        deleteTournament(input: { where: { id: $id } }) {
            tournament {
                id
                title
            }
        }
    }
`
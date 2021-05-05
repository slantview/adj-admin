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
            event {
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
            event {
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
// export const SEARCH_TOURNAMENTS = gql`
//     query SearchTournaments($name
//         tournaments(
//             where
//             sort
//             limit
//         ) {
//             id
//             title
//         }
//     }
// `
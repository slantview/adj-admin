import { gql } from '@apollo/client';

export const GET_ALL_SERIES = gql`
    query {
        seriesItems(publicationState: PREVIEW) {
            id
            title
            subtitle
            description
            cadence
            card {
                formats
            }
            header {
                formats
            }
            events(
                sort: "starts_at:DESC", 
                where: {
                    _or: [
                        { published_at_null: true },
                        { published_at_null: false }
                    ]
                }
            ) {
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
                    description
                    header {
                        id
                        formats
                    }
                    registration_cap
                    registration_cutoff
                    tournament_start_time
                    events {
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
                starts_at
                ends_at
                created_at
                updated_at
                published_at

            }
            created_at
            updated_at
            published_at
        }
    }
`;

export const GET_ALL_PUBLISHED_SERIES = gql`
    query {
        seriesItems(publicationState: LIVE) {
            id
            title
            subtitle
            description
            card {
                formats
            }
            header {
                formats
            }
            events(
                sort: "starts_at:DESC", 
                where: { published_at_null: true }
            ) {
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
                    description
                    header {
                        id
                        formats
                    }
                    registration_cap
                    registration_cutoff
                    tournament_start_time
                    events {
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
                starts_at
                ends_at
                created_at
                updated_at
                published_at

            }
            created_at
            updated_at
            published_at
        }
    }
`;

export const GET_SERIES = gql`
    query($id: ID!, $limit: Int!) {
        seriesItem(id: $id, publicationState: PREVIEW) {
            id
            slug
            title
            subtitle
            description
            cadence
            card {
                id
                formats
            }
            header {
                id
                formats
            }
            events(
                sort: "starts_at:DESC", 
                limit: $limit,
                where: {
                    _or: [
                        { published_at_null: true },
                        { published_at_null: false }
                    ]
                }
            ) {
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
                    description
                    header {
                        id
                        formats
                    }
                    registration_cap
                    registration_cutoff
                    tournament_start_time
                    events {
                        id
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
                starts_at
                ends_at
                created_at
                updated_at
                published_at

            }
            created_at
            updated_at
            published_at
        }
    }
`;

export const CREATE_SERIES = gql`
    mutation CreateNewSeries($payload: createSeriesItemInput) {
        createSeriesItem(input: $payload) {
            seriesItem {
                id
                slug
                title
                subtitle
                description
                card {
                    formats
                }
                header {
                    formats
                }
                created_at
                updated_at
            }
        }
    }
`

export const UPDATE_SERIES = gql`
    mutation UpdateSeries($payload: updateSeriesItemInput) {
        updateSeriesItem(input: $payload) {
            seriesItem {
                id
                slug
                title
                subtitle
                description
                card {
                    formats
                }
                header {
                    formats
                }
                created_at
                updated_at
            }
        }
    }
`

export const DELETE_SERIES = gql`
    mutation DeleteSeries($payload: deleteSeriesItemInput) {
        deleteSeriesItem(input: $payload) {
            seriesItem {
                title
            }
        }
    }
`
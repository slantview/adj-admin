import { gql } from '@apollo/client';

export const GET_ALL_SERIES = gql`
    query {
        seriesItems {
            id
            title
            subtitle
            description
            card {
                formats
            }
            events(sort: "starts_at:DESC", limit: 4, where: {published_at_null:false}) {
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
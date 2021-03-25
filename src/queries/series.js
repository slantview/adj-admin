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
                tournaments {
                    id
                    title
                }
                starts_at
                published_at
            }

            created_at
            updated_at
            published_at
        }
    }
`;
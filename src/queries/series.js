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
            events {
                id
                title
                tournaments {
                    id
                    title
                }
            }
            created_at
            updated_at
            published_at
        }
    }
`;
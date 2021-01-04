import { gql } from '@apollo/client';

export const GET_ALL_EVENTS = gql`
    query {
        events {
            id
            title
            description
            card {
                formats
            }
            header {
                formats
            }
            tournaments {
                id
                title
            }
            created_at
            updated_at
            published_at
        }
    }
`;
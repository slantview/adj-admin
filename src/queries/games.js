import { gql } from '@apollo/client';

export const GET_ALL_GAMES = gql`
    query {
        games {
            id
            title
            description
            cover {
                formats
            }
            header {
                formats
            }
            events {
                id
                title
            }
            created_at
            updated_at
        }
    }
`;
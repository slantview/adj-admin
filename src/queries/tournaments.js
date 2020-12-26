import { gql } from '@apollo/client';

export const GET_ALL_TOURNAMENTS = gql`
    query {
        tournaments {
            id
            title
            description
            header {
                formats
            }
            game {
                id
                title
                cover {
                    formats
                }
            }
            created_at
            updated_at
        }
    }
`;
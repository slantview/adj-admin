import { gql } from '@apollo/client';

export const GET_ALL_PLACES = gql`
    query {
        places {
            id
            name
            description
            city
            state
            postal_code
            country
            lat
            long
            logo {
                formats
            }
            promotional_images {
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
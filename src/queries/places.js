import { gql } from '@apollo/client';

export const GET_ALL_PLACES = gql`
    query {
        places(publicationState: PREVIEW) {
            id
            name
            # description
            # city
            # state
            # postal_code
            # country
            # lat
            # long
            logo {
                formats
            }
            # promotional_images {
            #     formats
            # }
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

export const GET_ALL_PLACES_NAME_ONLY = gql`
    query GetAllPlaces {
        places(publicationState: PREVIEW) {
            id
            name
        }
    }
`;

export const CREATE_PLACE = gql`
    mutation CreateNewPlace($payload: createPlaceInput) {
        createPlace(input: $payload) {
            place {
               id
               name
           }
        }
    }
`
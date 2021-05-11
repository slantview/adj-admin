import { gql } from '@apollo/client';

export const GET_ALL_PLACES = gql`
    query {
        places(publicationState: PREVIEW) {
            id
            name
            description
            type
            address_line_1
            address_line_2
            city
            state
            postal_code
            country
            lat
            long
            online_url
            is_online
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

export const UPDATE_PLACE = gql`
    mutation UpdatePlace($id: ID!, $data: editPlaceInput) {
        updatePlace(input: { 
            where: { id: $id },
            data: $data
        }) {
            place {
               id
               name
           }
        }
    }
`

export const GET_PLACE = gql`
    query GetPlace($id: ID!) {
        place(id: $id) {
            id
            name
            description
            type
            address_line_1
            address_line_2
            city
            state
            postal_code
            country
            lat
            long
            is_online
            online_url
            logo {
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
`
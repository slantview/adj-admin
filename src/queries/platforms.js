import { gql } from '@apollo/client';

export const GET_ALL_GAME_PLATFORMS = gql`
    query GetAllGamePlatforms {
        platforms {
            id
            name
            description
            games {
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
`

export const GET_GAME_PLATFORM = gql`
    query GetGamePlatform($id: ID!) {
        platform(id: $id) {
            id
            name
            description
            games {
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
`

export const CREATE_GAME_PLATFORM = gql`
    mutation CreateNewGamePlatform($payload: createPlatformInput) {
        createPlatform(input: $payload) {
            platform {
                id
                name
                description
                created_at
                updated_at
            }
        }
    }
`

export const UPDATE_GAME_PLATFORM = gql`
     mutation UpdateGamePlatform($id: ID!, $data: editPlatformInput) {
        updatePlatform(input: { 
            where: { id: $id },
            data: $data
        }) {
            platform {
                id
                name
                description
                created_at
                updated_at
            }
        }
    }
`

export const DELETE_GAME_PLATFORM = gql`
    mutation DeleteGamePlatform($id: ID!) {
        deletePlatform(input: { where: { id: $id } }) {
            platform {
                id
                name
                description
                created_at
                updated_at
            }
        }
    }
`
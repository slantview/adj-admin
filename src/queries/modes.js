import { gql } from '@apollo/client';

export const GET_ALL_GAME_MODES = gql`
    query GetAllGameModes {
        gameModes {
            id
            title
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

export const GET_GAME_MODE = gql`
    query GetGameMode($id: ID!) {
        gameMode(id: $id) {
            id
            title
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

export const CREATE_GAME_MODE = gql`
    mutation CreateGameMode($payload: createGameModeInput) {
        createGameMode(input: $payload) {
            gameMode {
                id
                title
                description
                created_at
                updated_at
            }  
        }
    }
`

export const UPDATE_GAME_MODE = gql`
     mutation UpdateMode($id: ID!, $data: editGameModeInput) {
        updateGameMode(input: { 
            where: { id: $id },
            data: $data
        }) {
            gameMode {
                id
                title
                description
                created_at
                updated_at
            } 
        }
    }
`

export const DELETE_GAME_MODE = gql`
    mutation DeleteGameMode($id: ID!) {
        deleteGameMode(input: { where: { id: $id } }) {
            id
            name
            description
            created_at
            updated_at
        }
    }
`
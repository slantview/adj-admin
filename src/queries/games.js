import { gql } from '@apollo/client';

export const GET_ALL_GAMES = gql`
    query {
        games(sort: "title:ASC", publicationState: PREVIEW) {
            id
            title
            description
            enabled
            cover {
                formats
            }
            header {
                formats
            }
            created_at
            updated_at
        }
    }
`;

export const GET_ENABLED_GAMES = gql`
    query {
        games(
            sort: "title:ASC", 
            publicationState: PREVIEW, 
            where: { enabled: true }
        ) {
            id
            title
            description
            enabled
            cover {
                formats
            }
            header {
                formats
            }
            created_at
            updated_at
        }
    }
`;

export const GET_GAME = gql`
    query($id: ID!) {
        game(id: $id) {
            id
            title
            description
            enabled
            cover {
                formats
            }
            header {
                formats
            }
            created_at
            updated_at
        }
    }
`;

export const UPDATE_GAME = gql`
    mutation($id: ID!, $game: editGameInput!) {
        updateGame(input: { 
            where: { id: $id },
            data: $game
        }) {
            game {
                id
                title
                description
                enabled
                cover {
                    formats
                }
                header {
                    formats
                }
                created_at
                updated_at
            }
        }
    }
`;
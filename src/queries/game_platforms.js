import { gql } from '@apollo/client';

export const GET_ALL_GAME_PLATFORMS = gql`
    query GetAllGamePlatforms {
        platforms(sort: "name:ASC") {
            id
            name
        }
    }
`;
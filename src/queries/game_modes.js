import { gql } from '@apollo/client';

export const GET_ALL_GAME_MODES = gql`
    query GetAllGameModes {
        gameModes(sort: "title:ASC", publicationState: PREVIEW) {
            id
            title
        }
    }
`;
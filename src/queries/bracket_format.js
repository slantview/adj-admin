import { gql } from '@apollo/client';

export const GET_ALL_BRACKET_FORMATS = gql`
    query GetAllBracketFormats {
        bracketFormats(sort: "title:ASC") {
            id
            title
        }
    }
`;




import { gql } from '@apollo/client';

export const GET_ALL_BRACKET_FORMATS = gql`
    query GetAllBracketFormats {
        bracketFormats(sort: "title:ASC") {
            id
            title
        }
    }
`;

export const GET_BRACKET_FORMAT = gql`
    query GetBracketFormat($id: ID!) {
        bracketFormat(id: $id) {
            id
            title
            description
            created_at
            updated_at
        }
    }
`


export const CREATE_BRACKET_FORMAT = gql`
    mutation CreateNewBracketFormat($payload: createBracketFormatInput) {
        createBracketFormat(input: $payload) {
            bracketFormat {
               id
               title
           }
        }
    }
`

export const UPDATE_BRACKET_FORMAT = gql`
     mutation UpdateBracketFormat($id: ID!, $data: editBracketFormatInput) {
        updateBracketFormat(input: { 
            where: { id: $id },
            data: $data
        }) {
            bracketFormat {
               id
               title
           }
        }
    }
`

export const DELETE_BRACKET_FORMAT = gql`
    mutation DeleteBracketFormat($id: ID!) {
        deleteBracketFormat(input: { where: { id: $id } }) {
            bracketFormat {
                id
                title
            }
        }
    }
`
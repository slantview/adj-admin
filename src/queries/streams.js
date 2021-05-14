import { gql } from '@apollo/client';

export const GET_ALL_STREAMS = gql`
    query GetAllStreams {
        streams {
            id
            name
            type
            url
            created_at
            updated_at
        }
    }
`

export const GET_STREAM = gql`
    query GetStream($id: ID!) {
        stream(id: $id) {
            id
            name
            type
            url
            created_at
            updated_at
        }
    }
`

export const CREATE_STREAM = gql`
    mutation CreateNewStream($payload: createStreamInput) {
        createStream(input: $payload) {
            stream {
               id
               name
           }
        }
    }
`

export const UPDATE_STREAM = gql`
     mutation UpdateStream($id: ID!, $data: editStreamInput) {
        updateStream(input: { 
            where: { id: $id },
            data: $data
        }) {
            stream {
               id
               name
           }
        }
    }
`

export const DELETE_STREAM = gql`
    mutation DeleteStream($id: ID!) {
        deleteStream(input: { where: { id: $id } }) {
            stream {
                id
                name
            }
        }
    }
`
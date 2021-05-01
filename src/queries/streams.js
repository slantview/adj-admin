import { gql } from '@apollo/client';

export const GET_ALL_STREAMS = gql`
    query GetAllStreams {
        streams {
            id
            name
        }
    }
`

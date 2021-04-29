import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
    mutation($file: Upload!) {
        upload(file: $file) {
            id
            name
            mime
            url
            __typename
        }
    }
`;
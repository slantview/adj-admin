import { gql } from '@apollo/client';

export const GET_ORGANIZATION_METADATA = gql`
    query {
        api {
            organizationInfo {
                id
                name
                logo {
                    formats
                }
                timezone {
                    name
                    value
                }
            }
        }
    }
`;
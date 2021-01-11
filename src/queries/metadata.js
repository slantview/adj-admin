import { gql } from '@apollo/client';

export const GET_ORGANIZATION_METADATA = gql`
    query {
        api {
            organizationInfo {
                name
                id
                created_at
                updated_at
                email
                logo {
                    formats
                }
                about
                website
                facebook
                instagram
                twitch
                twitter
                youtube
                patreon
                discord
            }
        }
    }
`;
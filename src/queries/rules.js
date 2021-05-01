import { gql } from '@apollo/client';

export const GET_ALL_GAME_RULES = gql`
    query GetAllGameRules {
        gameRules {
            id
            title
        }
    }
`


export const GET_ALL_GAME_RULE_LISTS = gql`
    query GetAllGameRuleLists {
        gameRuleLists {
            id
            title
        }
    }
`
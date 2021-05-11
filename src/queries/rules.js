import { gql } from '@apollo/client';

export const GET_ALL_GAME_RULES = gql`
    query GetAllGameRules {
        gameRules {
            id
            title
        }
    }
`

export const GET_GAME_RULE_LIST = gql`
    query GetAllGameRuleLists($id: ID!) {
        gameRuleList(id: $id) {
            id
            title
            description
            updated_at
            games {
                id
                title
                cover {
                    formats
                }
            }
        }
    }
`

export const GET_ALL_GAME_RULE_LISTS = gql`
    query GetAllGameRuleLists {
        gameRuleLists {
            id
            title
            description
            updated_at
            games {
                id
                title
                cover {
                    formats
                }
            }
        }
    }
`

export const CREATE_GAME_RULE_LIST = gql`
    mutation CreateNewGameRuleList($payload: createGameRuleListInput) {
        createGameRuleList(input: $payload) {
            gameRuleList {
               id
               title
           }
        }
    }
`

export const UPDATE_GAME_RULE_LIST = gql`
     mutation UpdateGameRuleList($id: ID!, $data: editGameRuleListInput) {
        updateGameRuleList(input: { 
            where: { id: $id },
            data: $data
        }) {
            gameRuleList {
               id
               title
           }
        }
    }
`

export const DELETE_GAME_RULE_LIST = gql`
    mutation DeleteGameRuleList($id: ID!) {
        deleteGameRuleList(input: { where: { id: $id } }) {
            gameRuleList {
                id
                title
            }
        }
    }
`
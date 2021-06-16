import { gql } from '@apollo/client';

export const GET_ALL_PAGES = gql`
    query GetAllPages {
        homePage {
            id
            title
            subtitle
            description
            header {
                id
                formats
            }
            use_hero_title_text
            enabled
            created_at
            updated_at
        }
        aboutPage {
            id
            title
            subtitle
            description
            header {
                id
                formats
            }
            use_hero_title_text
            enabled
            created_at
            updated_at
        }
        eventsListPage {
            id
            title
            subtitle
            description
            header {
                id
                formats
            }
            use_hero_title_text
            created_at
            updated_at
        }
        gamesListPage {
            id
            title
            subtitle
            description
            header {
                id
                formats
            }
            use_hero_title_text
            created_at
            updated_at
        }
    }
`

export const GET_HOME_PAGE = gql`
    query GetHomePage {
        homePage {
            id
            title
            subtitle
            description
            header {
                id
                formats
            }
            use_hero_title_text
            enabled
            created_at
            updated_at
        }
    } 
`

export const UPDATE_HOME_PAGE = gql`
    mutation UpdateHomePage($data: editHomePageInput!) {
        updateHomePage(input: {
            data: $data
        }) {
            homePage{
                id
                title
                subtitle
                description
                header {
                    id
                    formats
                }
                use_hero_title_text
                enabled
                created_at
                updated_at
            }
            
        }
    } 
`

export const GET_ABOUT_PAGE = gql`
    query GetAboutPage {
        aboutPage {
            id
            title
            subtitle
            description
            header {
                id
                formats
            }
            use_hero_title_text
            enabled
            created_at
            updated_at
        }
    } 
`

export const UPDATE_ABOUT_PAGE = gql`
    mutation UpdateAboutPage($data: editAboutPageInput!) {
        updateAboutPage(input: { 
            data: $data
        }) {
            aboutPage{
                id
                title
                subtitle
                description
                header {
                    id
                    formats
                }
                use_hero_title_text
                enabled
                created_at
                updated_at
            }
            
        }
    } 
`

export const GET_EVENTS_LIST_PAGE = gql`
    query GetEventsListPage {
        eventsListPage {
            id
            title
            subtitle
            description
            header {
                id
                formats
            }
            use_hero_title_text
            created_at
            updated_at
        }
    } 
`

export const UPDATE_EVENTS_LIST_PAGE = gql`
    mutation UpdateEventsListPage($data: editEventsListPageInput!) {
        updateEventsListPage(input: {
            data: $data
        }) {
            eventsListPage{
                id
                title
                subtitle
                description
                header {
                    id
                    formats
                }
                use_hero_title_text
                created_at
                updated_at
            }
            
        }
    } 
`

export const GET_GAMES_LIST_PAGE = gql`
    query GetGamesListPage {
        gamesListPage {
            id
            title
            subtitle
            description
            header {
                id
                formats
            }
            use_hero_title_text
            created_at
            updated_at
        }
    } 
`

export const UPDATE_GAMES_LIST_PAGE = gql`
    mutation UpdateGamesListPage($id: ID!, $data: editGamesListPageInput!) {
        updateGamesListPage(input: { 
            data: $data
        }) {
            gamesListPage{
                id
                title
                subtitle
                description
                header {
                    id
                    formats
                }
                use_hero_title_text
                created_at
                updated_at
            }
            
        }
    } 
`
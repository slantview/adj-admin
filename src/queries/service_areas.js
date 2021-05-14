import gql from "graphql-tag";

export const GET_ALL_GEO_REGION_LISTS = gql`
    query GetAllGeoRegionLists {
        geoRegionLists {
            id
            title
            places_geo_regions {
                id
                name
                type
            }
            created_at
            updated_at
        }
    }
`

export const GET_GEO_REGION_LIST = gql`
    query GetGeoRegionList($id: ID!) {
        geoRegionList(id: $id) {
            id
            title
            places_geo_regions {
                id
                name
                type
            }
            created_at
            updated_at
        }
    }
`


export const CREATE_GEO_REGION_LIST = gql`
    mutation CreateNewGeoRegionList($payload: createGeoRegionListInput) {
        createGeoRegionList(input: $payload) {
            geoRegionList {
               id
               title
           }
        }
    }
`

export const CREATE_GEO_REGION = gql`
    mutation CreateNewGeoRegion($payload: createGeoRegionInput) {
        createGeoRegion(input: $payload) {
            geoRegion {
               id
               name
           }
        }
    }
`

export const UPDATE_GEO_REGION_LIST = gql`
     mutation UpdateGeoRegionList($id: ID!, $data: editGeoRegionListInput) {
        updateGeoRegionList(input: { 
            where: { id: $id },
            data: $data
        }) {
            geoRegionList {
               id
               title
           }
        }
    }
`

export const DELETE_GEO_REGION_LIST = gql`
    mutation DeleteGeoRegionList($id: ID!) {
        deleteGeoRegionList(input: { where: { id: $id } }) {
            geoRegionList {
                id
                title
            }
        }
    }
`
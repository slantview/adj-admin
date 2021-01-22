const API_URL      = process.env.NODE_ENV === "production" ? "https://api.beacons.gg" : "http://localhost:8080";
const REGISTER_URL = API_URL + "/api/v1/user/register";
const SITES_URL    = API_URL + "/api/v1/sites";
const USERS_URL    = API_URL + "/api/v1/users";

export const registerUser = async (data) => {
    return fetch(REGISTER_URL, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const createSite = async (name, data) => {
    return fetch(SITES_URL + '/' + name, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getSites = async (token) => {
    return fetch(SITES_URL, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
}

export const getSiteMetadata = (url) => {
    return fetch(url + "/organization-info", {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const getUsers = async (token) => {
    return fetch(USERS_URL, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
}
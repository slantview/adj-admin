const API_URL           = process.env.NODE_ENV === "production" ? "https://api.beacons.gg" : "http://localhost:8080";
const REGISTER_URL      = API_URL + "/api/v1/users/register";
const SITES_URL         = API_URL + "/api/v1/sites";
const USERS_URL         = API_URL + "/api/v1/users";
const ORGANIZATIONS_URL = API_URL + "/api/v1/organizations";

export const registerUser = async (data) => {
    return fetch(REGISTER_URL, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const createSite = async (data, token) => {
    return fetch(SITES_URL, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
}

export const updateSite = async (id, data, token) => {
    return fetch(SITES_URL + '/' + id, {
        method: 'put',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
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

export const deleteSite = async (data, token) => {
    return fetch(SITES_URL + '/' + data.id, {
        method: 'delete',
        body: JSON.stringify(data),
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
};

export const suspendUser = async (id, token) => {
    return fetch(USERS_URL + '/' + id + '/suspend', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
};

export const deleteUser = async (id, token) => {
    return fetch(USERS_URL + '/' + id, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
};

export const resetPassword = async (id, token) => {
    return fetch(USERS_URL + '/' + id + '/reset', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
};

export const getOrganizations = async (token) => {
    return fetch(ORGANIZATIONS_URL, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
};

export const createOrganization = async (token, data) => {
    return fetch(ORGANIZATIONS_URL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
};

export const deleteOrganization = async (token, id) => {
    return fetch(ORGANIZATIONS_URL + '/' + id, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
};

export const getSiteAnalytics = async (token, id, pathId) => {
    const data = {
        "path": pathId
    };

    return fetch(SITES_URL + '/' + id + '/analytics', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
}
const API_URL      = "https://api.beacons.gg";
const REGISTER_URL = API_URL + "/api/v1/user/register";
const SITES_URL    = API_URL + "/api/v1/sites";

export const registerUser = async (data) => {
    return fetch(REGISTER_URL, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
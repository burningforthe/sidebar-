// import data from '../config/data.json';
import { BASE_URL } from '../config/constants';

export const getTopicList = () => async (dispatch, getState) => {
    // const localItem = data.local_item
    try {
        const url = BASE_URL + "api/v1/user-details";
        const userToken = getState().topic.token
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                'Authorization': `Token ${userToken}`,
                "Content-Type": "application/json"
            }
        })

        const data = await response.json();
        // console.log("Topic.actions.js getTopicList() topic_data", data)
        if ("status" in response && response.status < 400) {
            dispatch({
                type: "TOPIC_DATA",
                payload: data
            })
        }
    } catch (err) {
        console.log("Competition.action.js getPseudoname", err.message)
    }
}

export const saveAuthToken = (token) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'SAVE_AUTH_TOKEN',
            payload: token
        })
    } catch (err) {
        console.log("Topic.action.js saveAuthToken", err.message)
    }
}

export const resetPassword = (email) => async (dispatch, getState) => {
    try {
        const url = BASE_URL + 'api/v1/rest-auth/password/reset/';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        })

        const apiResponse = await response.json()
        // console.log("Topic.actions.js apiResponse", apiResponse)
        if ("status" in response && response.status < 400) {
            dispatch({
                type: "RESET_DETAIL",
                payload: apiResponse.detail
            })
        }
    } catch (err) {
        console.log("Topic.action.js saveAuthToken", err.message)
    }
}


export const updateTaskStatus = (objectId, status) => async (dispatch, getState) => {
    console.log("updateTaskStatus function initialised")
    try {
        const url = BASE_URL + 'api/v1/task-status/';
        const userToken = getState().topic.token
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Authorization': `Token ${userToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                object_id: objectId,
                status: status
            })
        });

        const apiResponse = await response.json();

        if ("status" in response && response.status < 400) {
            console.log("Topic.actions.js updateTaskStatus apiResponse", apiResponse)
        } else {
            console.log("Topic.actions.js updateTaskStatus apiResponse error", apiResponse)
        }
    } catch (e) {
        console.log(e.message)
    }
};

export const editProfile = (firstName, lastName, email, university, branch, year, degree, id) => async (dispatch, getState) => {
    console.log("firstName", firstName, "lastName", lastName, "email", email, "university", university, "branch", branch, "year", year, "degree", degree, "id", id)
    try {
        const userToken = getState().topic.token
        const url = BASE_URL + `api/v1/user-details/${id}/`;
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                'Authorization': `Token ${userToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                universiy: university,
                branch: branch,
                year: year,
                degree: degree
            })
        })

        const data = await response.json()
        console.log("Topic.actions.js editProfile() apiResponse data", data)
        if ("status" in response && response.status < 400) {
            console.log("Topic.actions.js editProfile() response.json", await response.status)
        }
    } catch (err) {
        console.log("Topic.action.js editProfile", err.message)
    }
}

//Logout from the app
export const logout = () => async(dispatch, getState) => {
    console.log("Topic.actions.js logout() initialised")
    try {
        dispatch({
            type: 'LOGOUT'
        })
    } catch (err) {
        console.log("Topic.action.js editProfile", err.message)
    }
}




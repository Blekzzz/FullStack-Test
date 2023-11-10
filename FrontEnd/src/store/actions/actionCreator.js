import { FETCH_COMPANY_EVENTS, FETCH_DETAIL_EVENT, FETCH_USER_VENDOR, FETCH_VENDOR_EVENTS, FINISH_LOADING } from "./actionType"

// const url = "http://localhost:3000"
const url = "https://fullstack-test.blekzzz.com"

export const finishLoading = () => {
    return {
        type: FINISH_LOADING
    }
}

export const fetchEventCompanySuccess = (payload) => {
    return {
        type: FETCH_COMPANY_EVENTS,
        payload
    }
}

export const fetchEventCompany = () => {
    return async function (dispatch, getState) {
        await fetch(url + '/events/company', { headers: { access_token: localStorage.access_token } })
            .then(res => res.json())
            .then(data => {
                dispatch(fetchEventCompanySuccess(data))
            })
    }
}

export const fetchEventVendorSuccess = (payload) => {
    return {
        type: FETCH_VENDOR_EVENTS,
        payload
    }
}

export const fetchEventVendor = () => {
    return async function (dispatch, getState) {
        await fetch(url + '/events/vendor', { headers: { access_token: localStorage.access_token } })
            .then(res => res.json())
            .then(data => {
                dispatch(fetchEventVendorSuccess(data))
            })
    }
}

export const fetchEventDetailSuccess = (payload) => {
    return {
        type: FETCH_DETAIL_EVENT,
        payload
    }
}

export const fetchDetail = (id) => {
    return async function (dispatch, getState) {
        await fetch(url, `/events/${id}`, {
            headers: { access_token: localStorage.access_token }
        })
            .then(res => res.json())
            .then(data => {
                dispatch(fetchEventDetailSuccess(data))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const handleRejectEvent = (eventId, reason) => {
    return async function (dispatch, getState) {
        await fetch (url + `/events/${eventId}/reject`, {
            method: 'PUT',
            headers: { 
                "Content-Type": "application/json",
                access_token: localStorage.access_token
            },
            body: JSON.stringify({ reason: reason })
        })
            .then(() => {
                dispatch(fetchEventVendor())
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const handleApproveEvent = (eventId, date) => {
    return async function (dispatch, getState) {
        await fetch(url + `/events/${eventId}/approve`, {
            method: 'PUT',
            headers: { 
                "Content-Type": "application/json",
                access_token: localStorage.access_token
            },
            body: JSON.stringify({ confirmedDate: date })
        })
            .then(() => {
                dispatch(fetchEventVendor())
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const handlePostEvent = (input) => {
    return async function (dispatch, getState) {
        await fetch(url + '/events', {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                access_token: localStorage.access_token
            },
            body: JSON.stringify(input)
        })
            .then(() => {
                console.log("success post")
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const fetchVendorSuccess = (payload) => {
    return {
        type: FETCH_USER_VENDOR,
        payload
    }
}

export const fetchVendor = () => {
    return async function (dispatch, getState) {
        await fetch(url + "/users/vendor", {
            method: 'GET',
            headers: { access_token: localStorage.access_token }
        })
            .then(res => res.json())
            .then(data => {
                dispatch(fetchVendorSuccess(data))
            })
            .catch(err => {
                console.log(err)
            })
    }
}
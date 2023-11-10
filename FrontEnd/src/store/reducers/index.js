import { FETCH_COMPANY_EVENTS, FETCH_DETAIL_EVENT, FETCH_USER_VENDOR, FETCH_VENDOR_EVENTS, FINISH_LOADING } from "../actions/actionType"

const initialState = {
    dataCompany: [],
    dataVendor: [],
    dataDetail: {},
    isLoading: true,
    vendor: []
}

export default function rootReducers(state = initialState, action) {
    switch (action.type) {
        case FETCH_COMPANY_EVENTS:
            return {
                ...state,
                dataCompany: action.payload
            }
        case FETCH_VENDOR_EVENTS:
            return {
                ...state,
                dataVendor: action.payload
            }
        case FETCH_DETAIL_EVENT:
            return {
                ...state,
                dataDetail: action.payload
            }
        case FETCH_USER_VENDOR:
            return {
                ...state,
                vendor: action.payload
            }
        case FINISH_LOADING:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}
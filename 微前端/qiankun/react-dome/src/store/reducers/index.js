import { SET_TOKEN } from '../actions/index'
import { combineReducers } from 'redux'

function token(state = { token: '' }, action) {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.token
            }
        default:
            return state
    }
}

export default combineReducers({ token })
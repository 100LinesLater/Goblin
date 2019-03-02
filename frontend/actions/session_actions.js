import * as apiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_ERRORS";

const receiveCurrentUser = (currentUser) => ({
    type: RECEIVE_CURRENT_USER, 
    currentUser
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

const receiveErrors = (errors) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const removeErrors = (errors = []) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const login = user => dispatch => (
    apiUtil.login(user).
    then(res => dispatch(receiveCurrentUser(res)), 
            err => dispatch(receiveErrors(err.responseJSON)))
);

export const logout = () => dispatch => (
    apiUtil.logout().
    then(res => dispatch(logoutCurrentUser(res)),
        err => dispatch(receiveErrors(err.responseJSON)))
);

export const signup = user => dispatch => (
    apiUtil.signup(user).
    then(res => dispatch(receiveCurrentUser(res)),
        err => dispatch(receiveErrors(err.responseJSON)))
);
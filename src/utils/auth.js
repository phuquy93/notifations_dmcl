const TokenKey = 'vue_admin_token'

const TokenKeyUser = 'vue_admin_token_user'

const TokenKeyName = 'vue_admin_name'

const TokenStore = 'vue_admin_store'

const TokenDK = 'vue_admin_status_dk'


export function getToken() {
    return localStorage.getItem(TokenKey)
}
export function getUser() {
    return localStorage.getItem(TokenKeyName)
}
export function getStore() {
    return localStorage.getItem(TokenStore)
}
export function getTokenUser() {
    return localStorage.getItem(TokenKeyUser)
}

export function setNotice(token) {

    return localStorage.setItem(TokenKey, token)
}

export function setToken(token) {

    return localStorage.setItem(TokenKeyUser, token)
}


export function setName(token) {

    return localStorage.setItem(TokenKeyName, token)
}

export function removeToken() {
    return localStorage.removeItem(TokenKey)
}

export function removeTokenUser() {
    return localStorage.removeItem(TokenKeyUser)
}

export function removeUser() {
    return localStorage.removeItem(TokenKeyName)
}

export function setStore(token) {
    return localStorage.setItem(TokenStore, token)
}

export function removeStore() {
    return localStorage.removeItem(TokenStore)
}


export function removeDk() {
    return localStorage.removeItem(TokenDK)
}

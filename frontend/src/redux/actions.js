export function addUser(user) {
    return async dispatch => {
        const res = await fetch(`/their-pass/api/user`, {
            method: 'POST', headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, body: JSON.stringify(user)
        });
        if (res.status === 401) {
            window.location.href = "/login"
        } else if (res.status !== 403) {
            console.log('RES');
            console.log(res);
            dispatch({
                type: 'ADD_USER', user
            })
        }
    }
}

export function editUser(user) {
    return async dispatch => {
        const res = await fetch(`/their-pass/api/user/${user.id}`, {
            method: 'PUT', headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, body: JSON.stringify(user)
        });
        if (res.status === 401) {
            window.location.href = "/login"
        } else if (res.status !== 403) {
            user = res.json();
            dispatch({
                type: 'EDIT_USER', user
            })
        }
    }
}

export function removeUser(id) {
    return async dispatch => {
        const res = await fetch(`/their-pass/api/user/${id}`, {
            method: 'DELETE',
        })
        if (res.status === 401) {
            window.location.href = "/login"
        } else if (res.status !== 403) {
            if (!res.ok) {
                res.text().then(function (text) {
                    alert(text);
                });
            } else {
                dispatch({
                    type: 'REMOVE_USER', id
                })
            }
        }
    }
}

export function loadUsers() {
    return async dispatch => {
        const response = await fetch('/their-pass/api/user/list');
        if (response.status === 401) {
            window.location.href = "/login"
        } else if (response.status !== 403) {
            const jsonData = await response.json();
            dispatch({
                type: 'LOAD_USERS', data: jsonData
            })
        }
    }
}


export function addAccount(account) {
    return async dispatch => {
        const res = await fetch(`/their-pass/api/account`, {
            method: 'POST', headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, body: JSON.stringify(account)
        });
        if (res.status === 401) {
            window.location.href = "/login"
        } else if (res.status !== 403) {
            dispatch({
                type: 'ADD_ACCOUNT', account
            })
        }
    }
}

export function editAccount(account) {
    return async dispatch => {
        const res = await fetch(`/their-pass/api/account/${account.id}`, {
            method: 'PUT', headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, body: JSON.stringify(account)
        });
        if (res.status === 401) {
            window.location.href = "/login"
        } else if (res.status !== 403) {
            account = res.json();
            dispatch({
                type: 'EDIT_ACCOUNT', account
            })
        }
    }
}

export function removeAccount(id) {
    return async dispatch => {
        const res = await fetch(`/their-pass/api/account/${id}`, {
            method: 'DELETE'
        });
        dispatch({
            type: 'REMOVE_ACCOUNT', id
        })
    }
}

export function loadAccounts() {
    return async dispatch => {
        const response = await fetch('/their-pass/api/account/list');
        if (response.status === 401) {
            window.location.href = "/login"
        } else if (response.status !== 403) {
            const jsonData = await response.json();
            dispatch({
                type: 'LOAD_ACCOUNTS', data: jsonData
            })
        }
    }
}

export function context() {
    return async dispatch => {
        const response = await fetch('/their-pass/api/context', {
            method: 'GET'
        });
        const jsonData = await response.json();
        console.log(jsonData);
        dispatch({
            type: 'LOAD_CONTEXT',
            is_admin: jsonData.isAdmin
        })
    }
}

export function logout() {
    return async dispatch => {
        fetch('/their-pass/api/logout').then(res => {
            window.location.href = "/login";
            dispatch({
                type: 'USER_LOGOUT'
            })
        });
    }
}

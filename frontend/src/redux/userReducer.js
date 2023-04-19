const initialState = {
    users: [],
    is_admin: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            state.users.push(action.user)
            return {
                ...state,
                users: state.users
            }
        case 'EDIT_USER':
            const users = state.users.filter((user) => user.id !== action.user.id)
            users.push(action.user)
            return {
                ...state,
                users: users
            }
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.id)
            };
        case 'LOAD_USERS':
            console.log(action)
            const usersNew = action.data.map(res => {
                return {
                    id: res.id,
                    login: res.login,
                    name: res.name,
                    surname: res.surname,
                    is_admin: res.isAdmin
                }
            })
            return {
                ...state,
                users: usersNew
            }
        case 'LOAD_CONTEXT':
            console.log(action);
            return {
                ...state,
                is_admin: action.is_admin
            };
        default:
            return state;
    }
}

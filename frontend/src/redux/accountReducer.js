const initialState = {
  accounts: []
}

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      state.accounts.push(action.account)
      return {
        ...state,
        accounts: state.accounts
    }
    case 'EDIT_ACCOUNT':
      const accounts = state.accounts.filter((account) => account.id !== action.account.id)
      accounts.push(action.account)
      return {
          ...state,
          accounts: accounts
        }
    case 'REMOVE_ACCOUNT':
        console.log(action.id);
        return {
          ...state,
          accounts: state.accounts.filter((account) => account.id !== action.id)
        };
    case 'LOAD_ACCOUNTS':
      console.log(action)
      const accountsNew = action.data.map(res => {
        return {
          id: res.id,
          description: res.description,
          login: res.login
        }
      })
      return {
      ...state,
      accounts: accountsNew
      }
    default:
      return state;
  }
}

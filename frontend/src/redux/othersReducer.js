const initialState = {
  filials: [],
  posts:[]
}

export const othersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_FILIALS':
      const filialsNew = action.data.map(res => {
        return {
          id: res.id,
          name: res.name
        }
      })
      return {
      ...state,
      filials: filialsNew
      }
    case 'LOAD_POSTS':
        const postsNew = action.data.map(res => {
          return {
            id: res.id,
            name: res.name
          }
        })
        return {
        ...state,
        posts: postsNew
        }
    default:
      return state;
  }
}

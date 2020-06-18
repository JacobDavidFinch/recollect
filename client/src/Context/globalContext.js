import React from 'react'
const GlobalStateContext = React.createContext()

const initialGlobalObj = {
  okay: true,
  editCardIndex: undefined,
  editCardMode: false,
  userName: 'jd0523@gmail.com',
  test: undefined,
  tags: undefined
}

function globalReducer(state, action) {
  console.log([state, action])
  switch (action.type) {
    case 'tags': return {
        ...state,
        tags: action.payload
      }
    case 'test': return {
        ...state,
        test: action.payload
      }
    case 'edit': return {
        ...state,
        editCardIndex: action.payload,
        editCardMode: action.payload !== undefined ? true : false
      }
    case 'login': return {
      ...state,
      ...action.payload
    }
    case 'clearGlobalStore': return {
      initialGlobalObj
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function GlobalProvider({children}) {
  const [state, dispatch] = React.useReducer(globalReducer, initialGlobalObj)
  return (
    <GlobalStateContext.Provider value={{state, dispatch}}>
        {children}
    </GlobalStateContext.Provider>
  )
}

function useGlobalState() {
  const context = React.useContext(GlobalStateContext)
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalProvider')
  }
  return context
}

export { GlobalProvider, useGlobalState }
import React from 'react'
const GlobalStateContext = React.createContext()

function globalReducer(state, action) {
  switch (action.type) {
    case 'increment': {
      return {count: state.count + 1}
    }
    case 'decrement': {
      return {count: state.count - 1}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const initialGlobalObj = {
    okay: true
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
import React, { useContext, useReducer } from 'react'
import AuthReducer from './AuthReducer'

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isFetching:false,
    isError:false
}

const AuthContext = React.createContext(INITIAL_STATE)

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
    return(
        <AuthContext.Provider value={{
            user:state.user,
            isFetching:state.isFetching,
            isError:state.isError,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useGlobalContext = () => {
    return useContext(AuthContext)
}

export { AuthContext, AuthProvider}
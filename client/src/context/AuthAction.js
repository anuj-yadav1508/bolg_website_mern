export const loginStart = (userCredentials) => (
    {type: 'LOGIN_START'}
)

export const loginSuccess = (user) => (
    {type:'LOGIN_SUCCESS', payload: user}
)

export const loginFailure = (err) => (
    {type:'LOGIN_FAILURE', payload: err}
)

export const login = (userCredentials) => (
    {type: 'LOGIN', payload:userCredentials}
)

export const logout = (userCredentials) => (
    {type:'LOGOUT', payload:userCredentials}
)
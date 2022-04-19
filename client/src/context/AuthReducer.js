const AuthReducer = (state, action) => {

    switch(action.type){
        case 'LOGIN_START':
            return{
                user:null,
                isFetching:true,
                isError:false
            }

        case 'LOGIN_SUCCESS':
            return {
                user:action.payload,
                isFetching:false,
                isError:false
            }

        case 'LOGIN_FAILURE':
            return {
                user:null,
                isFetching:false,
                isError:action.payload
            }

        default:
            return state
    }
}

export default AuthReducer;
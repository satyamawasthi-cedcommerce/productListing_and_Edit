import { VALIDATE } from "./Action"

const initialState = {
    userCredentials:{}
}
const reducer = (state=initialState,action) =>{
    switch(action.type){
        case VALIDATE:
            return{
                ...state,
                userCredentials:{...JSON.parse(sessionStorage.getItem("userCredentials"))}
            }
            default:
                return state
    }
}
export default reducer;
import { container_id, VALIDATE } from "./Action";

const initialState = {
  userCredentials: {},
  conatinerId: "",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case VALIDATE:
      return {
        ...state,
        userCredentials: {
          ...JSON.parse(sessionStorage.getItem("userCredentials")),
        },
      };
    case container_id: {
      return {
        ...state,
        conatinerId: (state.conatinerId = action.payload),
      };
    }
    default:
      return state;
  }
};
export default reducer;

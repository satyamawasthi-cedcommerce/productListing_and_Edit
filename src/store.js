import { createStore } from "redux";
import reducer from "./redux/Reducer";

const store = createStore(reducer)
export default store;
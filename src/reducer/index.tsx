import { combineReducers } from "redux";
import trelloReducer from "./trelloReducer";

//REDUCER SETUP
export default combineReducers({
  trello: trelloReducer,
});

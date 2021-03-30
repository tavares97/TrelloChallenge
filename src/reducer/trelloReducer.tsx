//IMPORT THE TYPES
import {
  ADD_CARD,
  ADD_LANE,
  DELETE_CARD,
  DELETE_LANE,
  ERROR,
  LOAD_BOARD,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_FAIL,
  USER_CARDS,
  USER_LANES,
  USER_LOADED,
  USER_LOGIN,
  USER_REGISTER,
} from "../actions/types";

//SET THE INITIAL APP STATE
const initialState = {
  accessToken: localStorage.getItem("accessToken"),
  user: null,
  userBoard: [{ cards: null }],
  lanes: [],
  cards: [],
  isAuthenticated: null,
  error: null,
};

//THE REDUCER RECEIVES THE STATE AND AN ACTION AS ARGUMENTS
const trelloReducer = (state = initialState, action: any) => {
  switch (action.type) {
    //THIS IS WHERE WE SET THE STATE
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case LOAD_BOARD:
      return {
        ...state,
        userBoard: action.payload,
      };

    case USER_LANES:
      return {
        ...state,
        lanes: action.payload,
      };

    case ADD_LANE:
      return {
        ...state,
        lanes: [...state.lanes, action.payload],
      };

    case DELETE_LANE:
      return {
        ...state,
        lanes: state.lanes.filter((lane: any) => lane.id !== action.payload),
      };

    case USER_CARDS:
      return {
        ...state,
        cards: action.payload,
      };

    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.payload],
      };

    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter((cards: any) => cards.id !== action.payload),
      };

    case USER_LOGIN:
    case USER_REGISTER:
      localStorage.setItem("accessToken", action.payload.accessToken);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case ERROR:
      localStorage.removeItem("accessToken");
      return {
        token: null,
        isAuthenticated: false,
        error: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("accessToken");
      return {
        user: null,
        userBoard: [],
        lanes: [],
        cards: [],
        isAuthenticated: null,
        error: null,
      };

    default:
      return state;
  }
};
export default trelloReducer;

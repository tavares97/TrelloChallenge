import axios from "axios";

import jwt_decode from "jwt-decode";

import {
  USER_LOGIN,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  USER_REGISTER,
  REGISTER_FAIL,
  USER_LANES,
  ERROR,
  ADD_LANE,
  DELETE_LANE,
  ADD_CARD,
  USER_CARDS,
  LOAD_BOARD,
  DELETE_CARD,
  LOGOUT,
} from "./types";

import setAuthToken from "../utils/setAuthToken";

export const loadUser = (id: number) => async (dispatch: any) => {
  setAuthToken(localStorage.accessToken);

  try {
    const res = await axios.get(`http://localhost:5000/users/${id}`);

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.message });
  }
};

export const loadBoard = (id: number) => async (dispatch: any) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/lanes?userId=${id}&_embed=cards`
    );

    dispatch({ type: LOAD_BOARD, payload: res.data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const userLanes = (id: number) => async (dispatch: any) => {
  try {
    const res = await axios.get(`http://localhost:5000/lanes?userId=${id}`);

    dispatch({ type: USER_LANES, payload: res.data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

export const userCards = (id: number) => async (dispatch: any) => {
  try {
    const res = await axios.get(`http://localhost:5000/cards?userId=${id}`);

    dispatch({ type: USER_CARDS, payload: res.data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

//ADD NEW LANE
export const addLane = (data: any) => async (dispatch: any) => {
  try {
    const res = await axios.post("http://localhost:5000/lanes", data);

    dispatch({ type: ADD_LANE, payload: res.data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
  }
};

//DELETE LANE
export const deleteLane = (id: number) => async (dispatch: any) => {
  try {
    await axios.delete(`http://localhost:5000/lanes/${id}`);

    dispatch({ type: DELETE_LANE, payload: id });
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
  }
};

//ADD NEW CARD
export const addCard = (data: any) => async (dispatch: any) => {
  try {
    const res = await axios.post(`http://localhost:5000/cards`, data);

    dispatch({ type: ADD_CARD, payload: res.data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
  }
};

//REMOVE CARD
export const deleteCard = (id: number, laneId: number) => async (
  dispatch: any
) => {
  try {
    await axios.delete(`http://localhost:5000/cards/${id}`);

    dispatch({ type: DELETE_CARD, payload: id, laneId });
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const logout = () => async (dispatch: any) => {
  try {
    dispatch({ type: LOGOUT });
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
  }
};

//SIGNIN
export const login = (formData: any) => async (dispatch: any) => {
  try {
    const res = await axios.post("http://localhost:5000/login", formData);

    const decode: any = jwt_decode(res.data.accessToken);
    const id: number = parseInt(decode.sub);

    dispatch({ type: USER_LOGIN, payload: res.data });
    dispatch(loadUser(id));
    dispatch(loadBoard(id));
    dispatch(userLanes(id));
    dispatch(userCards(id));
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.message });
  }
};

//REGISTER
export const register = (formData: any) => async (dispatch: any) => {
  try {
    const res = await axios.post("http://localhost:5000/register", formData);

    const decode: any = jwt_decode(res.data.accessToken);
    const id: number = parseInt(decode.sub);

    dispatch({ type: USER_REGISTER, payload: res.data });
    dispatch(loadUser(id));
    dispatch(loadBoard(id));
    dispatch(userLanes(id));
    dispatch(userCards(id));
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.message });
  }
};

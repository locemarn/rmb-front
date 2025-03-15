'use client'
import { State, Action } from "./global.types";

export function contextReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };

    case 'GET_USER_DATA':
      return state;

    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        notification: {
          isVisible: true,
          message: action.payload,
        },
      };
    case 'HIDE_NOTIFICATION':
      return {
        ...state,
        notification: {
          isVisible: false,
          message: '',
        },
      };
    default:
      return state;
  }
}
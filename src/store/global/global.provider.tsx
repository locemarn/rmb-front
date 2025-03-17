'use client'

import { useCallback, useContext, useEffect, useMemo, useReducer } from "react"
import { Props, User } from "./global.types"
import { contextReducer } from "./global.reducer"
import { AppContext } from "./global.state"

const INITIAL_STATE = {
  user: null,
  notification: {
    isVisible: false,
    message: '',
    notificationType: "is-success" as "is-success" | "is-info" | "is-warning" | "is-danger"
  }
}

export const AppProvider: React.FC<Props> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(contextReducer, INITIAL_STATE)

  useEffect(() => {
    const userStorage = sessionStorage.getItem('user')
    if (userStorage) {
      dispatch({
        type: 'LOGIN', 
        payload: {...JSON.parse(userStorage)}
      })
    }
  }, [])
  
  const handlerLogin = useCallback((user: User) => {
    sessionStorage.setItem('user', JSON.stringify({...user}))
    dispatch({
      type: 'LOGIN', 
      payload: {...user}
    })
  }, [])

  const handlerLogout = useCallback(() => {
    sessionStorage.removeItem('user')
    dispatch({
      type: 'LOGIN', 
      payload: null
    })
  }, [])

  const getUser = useCallback(() => {
    return state.user
  }, [state.user])

  const handlerNotification = useCallback((isVisible: boolean, message: string, notificationType: "is-info" | "is-success" | "is-warning" | "is-danger") => {
    const notType = notificationType ?? "is-success"
    dispatch({
      type: isVisible ? 'SHOW_NOTIFICATION' : 'HIDE_NOTIFICATION',
      payload: {message, notificationType: notType},
    })
  }, [])

  const getNotification = useCallback(() => {
    return state.notification
  }, [state.notification])

  const value = useMemo(() => ({
    user: state.user,
    handlerLogin,
    handlerLogout,
    getUser,
    handlerNotification,
    getNotification
  }), [state.user, handlerLogin, handlerLogout, getUser, handlerNotification, getNotification])

  return (
    <>
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    </>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context == undefined) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context
}
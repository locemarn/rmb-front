'use client'
import { createContext } from "react"
import { Context } from "./global.types"

export const AppContext = createContext<Context | null>(null)
AppContext.displayName = 'AppContext'
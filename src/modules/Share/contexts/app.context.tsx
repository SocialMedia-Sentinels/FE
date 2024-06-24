import React, { createContext, useState } from 'react'
import { getAccessTokenFromLocalStorage } from 'src/modules/Authentication/utils/auth'

interface AppContextType {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  hasMessage: boolean
  setHasMessage: React.Dispatch<React.SetStateAction<boolean>>
  reset: () => void
}

const initialAppContext: AppContextType = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => null,
  hasMessage: false,
  setHasMessage: () => null,
  reset: () => null
}

export const AppContext = createContext<AppContextType>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [hasMessage, setHasMessage] = useState<boolean>(initialAppContext.hasMessage)
  const reset = () => {
    setIsAuthenticated(false)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        hasMessage,
        setHasMessage,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

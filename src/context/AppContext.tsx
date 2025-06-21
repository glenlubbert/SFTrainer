import { createContext, useContext } from 'react'

interface UserProfile {
  name: string
  background: string
  experience: string
  goals: string
}

interface AppContextType {
  isTrainerMode: boolean
  setIsTrainerMode: (value: boolean) => void
  userProfile: UserProfile
  setUserProfile: (profile: UserProfile) => void
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider')
  }
  return context
} 
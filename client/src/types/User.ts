import React, { createContext, SetStateAction } from "react"

export type User = {
    displayName: string,
    email: string
}

type UserContextType = {
    user: User | null,
    setUser: React.Dispatch<SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextType | null>(null);
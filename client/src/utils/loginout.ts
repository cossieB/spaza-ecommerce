import { User } from "../types";

export function login(setUser: React.Dispatch<React.SetStateAction<User | null>>, user: User) {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
}

export function logout(setUser: React.Dispatch<React.SetStateAction<User | null>>) {
    setUser(null);
    localStorage.removeItem('user');
}
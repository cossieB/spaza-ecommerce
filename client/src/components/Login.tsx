import React, { useContext, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl } from "../globalVariables";
import sendData from "../utils/sendData";
import { FormInputString } from ".";
import { User, UserContext } from "../types";
import { login } from "../utils/loginout";
import { useLocation } from "react-router-dom";

const initialState = {
    email: "",
    password: "",
    errors: [] as string[]
}

export type LoginState = typeof initialState;

export function Login() {

    const [state, dispatch] = useReducer(authReducer<LoginState>, initialState)
    const { user, setUser } = useContext(UserContext)!
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const response = await sendData<User>(`${apiUrl}/auth/login`, 'POST', state)
        if ('errors' in response) {
            response.errors.forEach(error => dispatch({ type: 'ERROR', payload: error }))
        }
        else {
            login(setUser, response)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <FormInputString
                value={state.email}
                name="email"
                dispatch={dispatch}
            />
            <FormInputString
                value={state.password}
                name="password"
                dispatch={dispatch}
            />
            <div className="text-bg-danger" style={{ display: 'block' }}>
                {state.errors.map(err => <p key={err}> {err} </p>)}
            </div>
            <button className="btn btn-success" type="submit" >Go</button>
        </form >
    )
}
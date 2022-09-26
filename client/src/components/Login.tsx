import React, { useReducer } from "react";
import { authReducer } from "../contexts/reducers/authReducer";
import { apiUrl } from "../globalVariables";
import sendData from "../utils/sendData";
import FormInputString from "./AuthInput";

const initialState = {
    email: "",
    password: "",
    errors: [] as string[]
}

export type LoginState = typeof initialState;

export default function Login() {
    const [state, dispatch] = useReducer(authReducer<LoginState>, initialState)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const response = await sendData<{ id: string }>(`${apiUrl}/auth/login`, 'POST', state)

        if ('errors' in response) {
            response.errors.forEach(error => dispatch({ type: 'ERROR', payload: error }))
        }
        else {

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
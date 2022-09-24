import React, { useReducer } from "react"
import { signupReducer } from "../contexts/reducers/signupReducer"
import { apiUrl } from "../globalVariables"
import sendData from "../utils/sendData"
import FormInputString from "./AuthInput"

const initialState = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    errors: [] as string[]
}

export type SignupState = typeof initialState

export default function Signup() {
    const [state, dispatch] = useReducer(signupReducer, initialState)
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (! validate())  return;

        const response = await sendData(`${apiUrl}/auth/register`, 'GET', state)
        
    }
    function validate() {
        if (state.password != state.confirmPassword) {
            dispatch({type:'ERROR', payload: 'Passwords do not match'})
        }
        let rgx = /$[a-z][A-Z]/
        if (state.username.length < 3 || state.username.length > 12) {
            dispatch({type: 'ERROR', payload: 'Username must be between 3 and 12 characters'})
        }
        if (/\W/.test(state.username)) {
            dispatch({type: 'ERROR', payload: 'Username can only contain numbers, letters and underscores'})
        }
        return state.errors.length == 0
    }
    return (
        <form action="" onSubmit={handleSubmit}>
            <FormInputString
                value={state.username}
                name="username"
                dispatch={dispatch}
            />
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
            <FormInputString
                value={state.confirmPassword}
                name="confirmPassword"
                dispatch={dispatch}
            />
            <div className="text-bg-danger" style={{display: 'block'}}>
                {state.errors.map(err => <p key={err}> {err} </p>)}
            </div>
            <button className="btn btn-success" type="submit" >Go</button>
        </form >
    )
}


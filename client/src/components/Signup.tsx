import React, { useContext, useReducer } from "react"
import { authReducer } from "../reducers/authReducer"
import { apiUrl } from "../globalVariables"
import sendData from "../utils/sendData"
import {FormInputString} from "./"
import { User, UserContext } from "../types"
import { login } from "../utils/loginout"

const initialState = {
    displayName: "",
    password: "",
    confirmPassword: "",
    email: "",
    errors: [] as string[]
}

export type SignupState = typeof initialState

export function Signup() {
    const [state, dispatch] = useReducer(authReducer<SignupState>, initialState);
    const {user, setUser} = useContext(UserContext)!
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        dispatch({type: 'CLEAR_ERROR'})
        let shouldSend = true;
        if (state.password != state.confirmPassword) {
            dispatch({type:'ERROR', payload: 'Passwords do not match'})
            shouldSend = false;
        }
        
        if (state.displayName.length < 3 || state.displayName.length > 20) {
            dispatch({type: 'ERROR', payload: 'Display name must be between 3 and 20 characters'})
            shouldSend = false;
        }
        // const arr = [/\d+/, /[a-z_]+/, /[A-Z]+/, /\W/]
        // const test = arr.some(rgx => !rgx.test(state.password))
        if (state.password.length < 8) {
            dispatch({type: 'ERROR', payload: 'Password must be at least 8 characters'})
            shouldSend = false;
        }

        if (shouldSend) return send()

    }
    async function send() {
        const response = await sendData<User>(`${apiUrl}/auth/register`, 'POST', state)
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
                value={state.displayName}
                name="displayName"
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


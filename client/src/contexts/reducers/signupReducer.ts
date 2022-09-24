import { SignupState } from "../../components/Signup"



interface LoginState {
    email: string
    password: string
    error: string
    isLoading: boolean
}

export type SignupAction = {
    type: 'UPDATE_STRING'
    payload: {
        name: Exclude<(keyof SignupState), 'errorMsg'>,
        value: string
    }
} | {
    type: 'ERROR'
    payload: string
} | {
    type: 'CLEAR_ERROR'
}

export function signupReducer(state: SignupState, action: SignupAction): SignupState {
    switch (action.type) {
        case 'UPDATE_STRING':
            return {...state, [action.payload.name]: action.payload.value, errors: []}
        case 'ERROR':
            return {...state, errors: [...state.errors, action.payload]}
        case 'CLEAR_ERROR':
            return {...state, errors: []}
    }
}
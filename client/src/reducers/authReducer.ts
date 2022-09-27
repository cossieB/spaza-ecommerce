export type FormAction<T extends {errors: string[]}> = {
    type: 'UPDATE_STRING'
    payload: {
        name: keyof T,
        value: string
    }
} | {
    type: 'ERROR'
    payload: string
} | {
    type: 'CLEAR_ERROR'
}

export function authReducer<T extends {errors: string[]}>(state: T, action: FormAction<T>): T {
    switch (action.type) {
        case 'UPDATE_STRING':
            return {...state, [action.payload.name]: action.payload.value, errors: []}
        case 'ERROR':
            return {...state, errors: [...state.errors, action.payload]}
        case 'CLEAR_ERROR':
            return {...state, errors: []}
    }
}
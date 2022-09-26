import { Dispatch } from "react"
import { FormAction } from "../contexts/reducers/authReducer"
import titleCase from "../utils/titleCase"
import { LoginState } from "./Login"
import { SignupState } from "./Signup"

interface Props<T extends {errors: string[]}>  {
    name: (keyof T) & string,
    value: string,
    title?: string,
    dispatch: Dispatch<FormAction<T>>
}

export default function FormInputString<T extends {errors: string[]} >(props: Props<T>) {
    const { name, dispatch, value } = props;
    const title = props.title || titleCase(name)

    return (
        <div className="mb-3">
            <label className="form-label" htmlFor={name}> {title} </label>
            <input
                className="form-control"
                type={ name.toLowerCase().includes("password") ? 'password' : name.toLowerCase().includes('email') ? 'email' : 'text'}
                id={name}
                name={name}
                onChange={e => dispatch({ type: 'UPDATE_STRING', payload: { name, value: e.target.value } })}
                placeholder={title}
                required
            />
        </div>
    )
}
import { Dispatch } from "react"
import { SignupAction } from "../contexts/reducers/signupReducer"
import titleCase from "../utils/titleCase"
import { SignupState } from "./Signup"

interface P {
    name: Exclude<keyof SignupState, 'errorMsg'>,
    value: string,
    title?: string,
    dispatch: Dispatch<SignupAction>
}

export default function FormInputString(props: P) {
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
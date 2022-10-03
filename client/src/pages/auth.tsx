import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Login, Signup, Toast } from "../components";
import { apiUrl } from "../globalVariables";
import { UserContext } from "../types";

export function Auth() {
    const [query] = useSearchParams()
    const [isLogin, setIsLogin] = useState(query.get("type") == "login" || false)
    const { user, setUser } = useContext(UserContext)!
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            navigate((location.state as Record<string, string>)?.redirect || "/")
        }
    }, [user])
    return (
        <div className="container pt-5">
            <>
                {location.state && <Toast>{(location.state as Record<string, any>)?.message} </Toast>}
                <button className="btn btn-info" onClick={() => setIsLogin(prev => !prev)} >
                    {isLogin ? "Do not have an account?" : "Already have an account?"}
                </button>
                {isLogin ? <Login /> : <Signup />}
            </>
        </div>
    )
}
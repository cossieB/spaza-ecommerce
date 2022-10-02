import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Login, Signup } from "../components";
import { apiUrl } from "../globalVariables";
import { UserContext } from "../types";

export function Auth() {
    const [query] = useSearchParams()
    const [isLogin, setIsLogin] = useState(query.get("type") == "login" || false)
    const {user, setUser} = useContext(UserContext)!
    const navigate = useNavigate()
    const location = useLocation() as any;

    useEffect(() => {   
        const storedUser = localStorage.getItem('user')
        if (storedUser ) {
            setUser(JSON.parse(storedUser));
            navigate("/")
        }
    }, [user])
    return (
        <div className="container pt-5">
            <button className="btn btn-info" onClick={() => setIsLogin(prev => !prev)} >
                { isLogin ? "Do not have an account?" : "Already have an account?" }
            </button>
            {location.state?.message}
           { isLogin ? <Login /> : <Signup />  }
        </div>
    )
}
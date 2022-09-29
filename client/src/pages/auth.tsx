import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login, Signup } from "../components";
import { apiUrl } from "../globalVariables";
import { UserContext } from "../types";

export function Auth() {
    const [isLogin, setIsLogin] = useState(false)
    const {user, setUser} = useContext(UserContext)!
    const navigate = useNavigate()
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
           { isLogin ? <Login /> : <Signup />  }
        </div>
    )
}
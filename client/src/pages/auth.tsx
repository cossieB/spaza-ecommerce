import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(false)
    return (
        <div className="container pt-5">
            <button className="btn btn-info" onClick={() => setIsLogin(prev => !prev)} >
                { isLogin ? "Do not have an account?" : "Already have an account?" }
            </button>
           { isLogin ? <Login /> : <Signup />  }
        </div>
    )
}
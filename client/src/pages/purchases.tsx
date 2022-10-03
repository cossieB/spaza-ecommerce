import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader, Toast } from "../components";
import { apiUrl } from "../globalVariables";
import { useFetch } from "../hooks";
import { Purchase, UserContext } from "../types";
import { logout } from "../utils/loginout";

export function Purchases() {
    const location = useLocation()
    const [isLoading, setLoading] = useState(true)
    const { user, setUser } = useContext(UserContext)!
    const [purchases, setPurchases] = useState<Purchase[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        (async function () {
            if (!user) return navigate("/auth", {state: {
                message: "Please log in to view your purchases.",
                redirect: "/purchases"
            }})
            const response = await fetch(`${apiUrl}/auth/purchases`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })
            if (response.status == 401) {
                logout(setUser)
                navigate('/auth?type=login', {state: {
                    message: "Your session has expired please login.",
                    redirect: "/purchases"
                }})
            }
            const data = await response.json()
            setPurchases(data)
            setLoading(false)
        })()
    }, [])

    return (
        <div className="container shadow-lg" >
            <>
                {location.state && <Toast>{(location.state as Record<string, any>)?.message} </Toast>}
                <Loader isLoading={isLoading} >
                    <div>

                        {purchases.map(purchase =>
                            <div>
                                {purchase.date.toString()}
                            </div>
                        )}
                    </div>
                </Loader>
            </>
        </div>
    )
}
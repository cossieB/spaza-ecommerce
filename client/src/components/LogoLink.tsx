import { Link } from "react-router-dom"

type P = {
    link: string,
    logo: string
}

export function LogoLink({ link, logo }: P) {
    return (
        <Link to={link} >
            <img className="img-thumbnail mx-3 mb-3" style={{height: '5rem'}} src={logo} alt="" />
        </Link>
    )
}
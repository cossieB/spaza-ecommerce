export default function Login() {
    return (
        <form action="">
            <label htmlFor="email">Email</label>
            <input
                className="form-control"
                type="email"
                name="email"
                id="email"
            />
            <label htmlFor="password">Password</label>
            <input
                className="form-control"
                type="password"
                name="password"
                id="password"
            />
        </form >
    )
}
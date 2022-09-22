interface P {
    isLoading: boolean
    children: JSX.Element
}

export default function Loader({ isLoading, children }: P) {
    return (
        isLoading ? 
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> :
            children
    )
}
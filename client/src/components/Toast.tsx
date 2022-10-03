import {Toast as BootstrapToast} from "bootstrap"
import { useEffect, useRef } from "react"

interface P {
    header?: string
    children: React.ReactNode
}

export function Toast({ children, header }: P) {
    const divRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const toast = new BootstrapToast(divRef.current!, {autohide: false})
        toast.show()
    }, [])
    return (
        <div ref={divRef} className="toast text-bg-primary position-absolute start-50 translate-middle-x" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/OOjs_UI_icon_alert_destructive.svg" className="rounded me-2" alt="..." />
                <strong className="me-auto">{header || "Message"}</strong>
                <small>Now</small>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
                {children}
            </div>
        </div>
    )
}
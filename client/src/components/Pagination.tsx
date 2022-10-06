import { SetStateAction } from "react"

interface P {
    page: number
    setPage: React.Dispatch<SetStateAction<number>>
    maxPage: number
}

export function Pagination({ page, setPage, maxPage }: P) {
    function handleClick(change: -1 | 1) {
        const newPage = page + change
        if (newPage > maxPage || newPage < 0) return;
        setPage(newPage)
    }
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li className={ page == 0 ? "page-item disabled" : "page-item" }>
                    <a className="page-link" onClick={() => handleClick(-1)} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li className="page-item"><a className="page-link" onClick={() => setPage(0)}>1</a></li>
                <li className={ page == maxPage ? "page-item disabled" : "page-item" }>
                    <a className="page-link" onClick={() => handleClick(1)} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
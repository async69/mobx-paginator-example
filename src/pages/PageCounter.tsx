import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import PostStore from "../store/post"
import "../css/pageCounter.css"

const PageCounter = () => {
    const postStore = useContext(PostStore)
    const { gotoNextPage, gotoPrevPage, setCurrentPage, currentPage, info } = postStore
    const { isFirstPage, isLastPage } = info
    const TOTAL_PAGES = 7
    const MAX_VIEW_PAGES = 5
    const counterArray = Array(TOTAL_PAGES).fill("").map((_, idx) => idx + 1)

    return (
        <div className="page-counter-container row">
            <nav aria-label="...">
                <ul className="pagination">
                    <li className={"page-item".concat(isFirstPage? " disabled" : "")}>
                        <span className="page-link" onClick={() => gotoPrevPage()}>Previous</span>
                    </li>

                    {counterArray
                    .slice(
                        currentPage < MAX_VIEW_PAGES? 0 : currentPage - MAX_VIEW_PAGES,
                        currentPage < MAX_VIEW_PAGES? MAX_VIEW_PAGES : MAX_VIEW_PAGES + (currentPage - MAX_VIEW_PAGES)
                    )
                    .map((idx, _) => (
                        (idx === currentPage)?
                        <li className="page-item active">
                            <span className="page-link">
                                {idx}
                                <span className="sr-only">{idx}</span>
                            </span>
                        </li> :
                        <li className="page-item" onClick={() => setCurrentPage(idx)}><span className="page-link">{idx}</span></li>
                    ))}
                    <li className={"page-item".concat(isLastPage? " disabled" : "")}>
                        <span className="page-link" onClick={() => gotoNextPage()}>Next</span>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default observer(PageCounter)
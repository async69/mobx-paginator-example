import React, { useContext, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import PostStore, { IPost } from "../store/post"
import "../css/list.css"

const PostList = () => {
    const postStore = useContext(PostStore)
    const { currentPage, loadPosts, posts, pageSize } = postStore
    const [filteredPosts, setPosts] = useState<IPost[]>([])

    useEffect(() => { 
        loadPosts()
        var start = (currentPage - 1) * pageSize
        var newOnes = posts.slice(start, posts.length)
        setPosts(newOnes)
    }, [currentPage, setPosts, loadPosts, posts, pageSize])

    return (
        <div className="container list-container">
            {posts.length > 0 && Array(2).fill("").map((_, pIdx) => (
                <div className="row list-row">
                    {Array(3).fill("").map((_, cIdx) => (
                        <div className="card col-md-3" style={{ width: '50rem' }}>
                            <img className="card-img-top" src={filteredPosts[(3 * pIdx) + cIdx].image} alt="Card cap" />
                            <div className="card-body">
                                <h5 className="card-title">{filteredPosts[(3 * pIdx) + cIdx].title}</h5>
                                <p className="card-text">{filteredPosts[(3 * pIdx) + cIdx].content}</p>
                                <span className="btn btn-primary">Read More</span>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default observer(PostList)
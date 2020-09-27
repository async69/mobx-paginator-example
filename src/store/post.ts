import { action, observable, computed, reaction } from "mobx"
import { createContext } from "react"
import * as faker from "faker"

export interface IPost {
    image: string
    title: string
    content: string
}

const returnImage = (imgSuffix: number): string => {
    const images = [
        "/assets/post-1.jpg",
        "/assets/post-2.jpg",
    ]
    
    return images[imgSuffix % 2]
}

const generatePost = (amount: Number, imgSuffix: number): IPost[] => {
    return Array(amount).fill(0)
        .map(() => ({
            title: faker.lorem.words(),
            content: faker.lorem.paragraph(),
            image: returnImage(imgSuffix)
        }))
}

class Post {
    constructor() {
        reaction(() => this.posts, _ => console.log(this.posts.length))
    }

    @observable posts: IPost[] = []

    @observable
    MAX_POSTS = 140

    @observable
    after: number | undefined

    @observable
    currentPage = 1

    @observable
    pageSize = 20

    @observable
    isLastPage = false

    @observable
    isFirstPage = true

    @action loadPosts = () => {
        return generatePost(this.pageSize, this.currentPage)
            .forEach(post => this.posts.push(post))
    }

    @action setCurrentPage = (pageNumber: number) => {
        if (this.posts.length <= pageNumber * this.pageSize) {
            this.loadPosts()
            this.setCurrentPage(pageNumber)
        }
        this.currentPage = pageNumber
    }

    @computed get currentPageData() {
        if (this.currentPage * this.pageSize > this.posts.length) {
            this.loadPosts()
        }
        return this.posts.slice(this.currentPage * this.pageSize, this.posts.length)
    }

    @computed get info() {
        return { 
            isLastPage: this.currentPage * this.pageSize >= this.MAX_POSTS,
            isFirstPage: this.currentPage === 1
        }
    }

    @action gotoNextPage = () => {
        if (this.currentPage * this.pageSize < this.MAX_POSTS) {
            this.currentPage = this.currentPage + 1
        }
    }

    @action gotoPrevPage = () => {
        if (this.currentPage !== 1) {
            this.currentPage = this.currentPage - 1
        }
    }

}

export default createContext(new Post())
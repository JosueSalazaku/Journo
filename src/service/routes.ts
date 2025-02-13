import axios from "axios"
import { type Post } from "~/types";

export const addPosts = async (title: string, content: string, userId: string) => {
    try {
        const data = { title, content, userId }
        const response = await axios.post("/api/posts", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        if (response.status === 200) {
            console.log("Post added succesfully", response.data);
        }
    } catch (error) {
        console.error("Error adding post:", error)
        throw error
    }

}

export const getAllPosts = async () => {
    try {
        const response = await axios.get('/api/posts')

        if (response.status === 200 || response.status === 201) {
            console.log(response.data);
            return response.data as Post[]
        }
       
    } catch (error) {
        console.error("Error Fetching all post:", error)
        throw error
    }
}
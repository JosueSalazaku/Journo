import axios from "axios"

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
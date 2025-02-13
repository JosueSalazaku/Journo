import axios from "axios"


const addPosts = async (title: string, content: string, userId: string) => {
    try {
        const data = { title, content, userId }
        const response = await axios.post("localhost:3000/api/posts", data)

        if (response.status === 200) {
            console.log("Post added succesfully", response.data);
            
        }
    } catch (error) {
        console.error("Error adding post:", error)
        throw error
    }

}
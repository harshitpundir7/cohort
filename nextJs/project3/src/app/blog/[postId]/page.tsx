import axios from "axios";

export default async function BlogPage({ params }: any) {
    const postId = await params.postId; 
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const data = response.data;
    console.log(data);
    
    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.body}</p>
        </div>
    );
}

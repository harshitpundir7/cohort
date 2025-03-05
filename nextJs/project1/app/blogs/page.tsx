import axios from "axios";

async function getBlogs(){
    const response = await axios.get('https://dummyjson.com/todos');
    return response.data.todos;
}

export default async function Blogs(){
    const blogs = await getBlogs();

    return (
        <div>
            Learn Recoil/Redux from the best platform in the world
            {blogs.map((blog: ITodo) => <Todo key={blog.todo} title={blog.todo} completed={blog.completed} />)}
        </div>
    )
}

interface ITodo {
    todo: string;
    completed: boolean;
}

function Todo({ title, completed }: { title: string; completed: boolean }) {
    return (
        <div>
            {title} {completed ? "✅ Done!" : "❌ Not Done"}
        </div>
    );
}

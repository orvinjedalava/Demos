import { useState, useEffect } from 'react';
import { BlogList } from './BlogList';

type Blog = {
    id: number;
    title: string;
    body: string;
    author: string;
}

export const Home: React.FC = () => {
    const[blogs, setBlogs] = useState<Blog[]>([]);
    const[isPending, setIsPending] = useState<boolean>(true);

    // This is the function that is going to run everytime there is a re-render
    // We can pass a dependency array to indicate the objects that it keeps track of before running the useEffect function.
    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:8000/blogs')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setBlogs(data);
                setIsPending(false);
            })
        }, 1000)
    }, []);

    return (
        <div className="home">
            { isPending && <div>Loading...</div> }
            {blogs && blogs.length > 0 && <BlogList title='All Blogs' blogs={blogs}/>}
        </div>
    )
}
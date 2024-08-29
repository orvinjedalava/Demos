import { useState, useEffect } from 'react';
import { BlogList } from './BlogList';

export const Home: React.FC = () => {
    const[blogs, setBlogs] = useState([
        { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
        { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
        { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'jed', id: 3 }
    ]);

    const handleDelete = (id: number) => {
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(newBlogs);
    }

    // This is the function that is going to run everytime there is a re-render
    useEffect(() => {
        console.log('use effect ran');
        console.log(blogs);
    });

    return (
        <div className="home">
            <BlogList title='All Blogs' blogs={blogs} handleDelete={handleDelete}/>
            <BlogList title='Mario Blogs' blogs={blogs.filter(blog => blog.author === 'mario')} handleDelete={handleDelete}/>
        </div>
    )
}
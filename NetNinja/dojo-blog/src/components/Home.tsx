import { useState } from 'react';
import { BlogList } from './BlogList';

export const Home: React.FC = () => {
    const[blogs, setBlogs] = useState([
        { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
        { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
        { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'jed', id: 3 }
    ]);
    return (
        <div className="home">
            <BlogList title='All Blogs' blogs={blogs}/>
        </div>
    )
}
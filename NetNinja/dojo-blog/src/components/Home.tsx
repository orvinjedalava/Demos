import { useState, useEffect } from 'react';
import { BlogList } from './BlogList';
import { Data } from '../types/MyTypes';
import { useFetch } from '../hooks/useFetch';

export const Home: React.FC = () => {
    const { data, isPending, error} = useFetch('http://localhost:8000/blogs');
    
    return (
        <div className="home">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { data && data.length > 0 && <BlogList title='All Blogs' blogs={data}/>}
        </div>
    )
}
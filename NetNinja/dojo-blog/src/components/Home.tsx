import { BlogList } from './BlogList';
import { useFetch } from '../hooks/useFetch';
import { Data } from '../types/MyTypes';

export const Home: React.FC = () => {
    const { data, isPending, error} = useFetch('http://localhost:8000/blogs');
    const blogs: Data[] = data as Data[];
    
    return (
        <div className="home">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { data && blogs.length > 0 && <BlogList title='All Blogs' blogs={blogs}/>}
        </div>
    )
}
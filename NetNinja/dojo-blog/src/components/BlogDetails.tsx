import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Data } from "../types/MyTypes";
import { useState } from "react";
import { useAuth } from '../authentications/AuthContext';

export const BlogDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isPending, error } = useFetch(`${process.env.REACT_APP_API_URL}/Blogs/${id}`);
    const blog = data as Data;
    const navigate:  NavigateFunction = useNavigate();
    const [ isDeletePending, setIsDeletePending ] = useState<boolean>(false);
    const { jwtToken } = useAuth();

    const handleClick = () => {
        setIsDeletePending(true);
        fetch(`${process.env.REACT_APP_API_URL}/Blogs/${blog.id}`, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${jwtToken?.access_token}` 
            }
        }).then(() => {
            navigate('/');
            setIsDeletePending(false);
        });
    }

    return (
        <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div>}
            { !isPending && data && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author}</p>
                    <div>{ blog.body }</div>
                    { !isDeletePending && <button onClick={handleClick}>Delete</button> }
                    { isDeletePending && <button>Deleting...</button> }
                </article>
            )}
        </div>
    );
}
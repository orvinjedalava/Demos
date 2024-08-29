import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Data } from "../types/MyTypes";
import { useState } from "react";

export const BlogDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isPending, error } = useFetch('http://localhost:8000/blogs/' + id);
    const blog = data as Data;
    const navigate:  NavigateFunction = useNavigate();
    const [ isDeletePending, setIsDeletePending ] = useState<boolean>(false);

    const handleClick = () => {
        setIsDeletePending(true);
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
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
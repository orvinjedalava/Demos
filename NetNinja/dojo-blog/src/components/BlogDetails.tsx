import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Data } from "../types/MyTypes";

export const BlogDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isPending, error } = useFetch('http://localhost:8000/blogs/' + id);
    const blog = data as Data;

    return (
        <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div>}
            { data && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author}</p>
                    <div>{ blog.body }</div>
                </article>
            )}
        </div>
    );
}
import { useState } from "react"
import { useNavigate, NavigateFunction } from "react-router-dom"

export const Create = () => {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [author, setAuthor] = useState<string>('mario');
    const [isPending, setIsPending] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const blog = { title, body, author };

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added');
            setIsPending(false);
            navigate('/');
        });
    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                    type="text"
                    required
                    value={ title }
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} 
                />
                <label>Blog body:</label>
                <textarea 
                    required
                    value={ body }
                    onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
                >
                </textarea> 
                <label>Blog author:</label>
                <select
                    value={ author }
                    onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                { !isPending && <button>Add Blog</button>}
                { isPending && <button>Adding Blog...</button>}
            </form>
        </div>
    )
}
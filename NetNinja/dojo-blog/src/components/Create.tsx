import { useState } from "react"

export const Create = () => {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [author, setAuthor] = useState<string>('mario');

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form>
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
                <button>Add Blog</button>
                <p>{ title }</p>
                <p>{ body }</p>
                <p>{ author }</p>
            </form>
        </div>
    )
}
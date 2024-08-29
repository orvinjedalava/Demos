type BlogListProps = {
    title: string;
    blogs: {
        id: number;
        title: string;
        body: string;
        author: string;
    }[];
    handleDelete: (id: number) => void;
}

export const BlogList = ({ title, blogs, handleDelete }: BlogListProps) => {

    return (
        <div className="blog-list">
            <h2>{ title }</h2>
            {blogs.map(blog => (
                <div className="blog-preview" key={blog.id}>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <button onClick={() => handleDelete(blog.id)}>Delete Blog</button>
                </div>
            ))}
        </div>
    )
}
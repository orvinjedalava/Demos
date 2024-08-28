// React.FC is short for React.FunctionComponent. It is a type that describes a function component. 
// It is a generic type that takes props as a type argument.
export const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <h1>The Dojo Blog</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/create">New Blog</a>
            </div>
        </nav>
    );
}
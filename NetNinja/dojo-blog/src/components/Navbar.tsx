// React.FC is short for React.FunctionComponent. It is a type that describes a function component. 
// It is a generic type that takes props as a type argument.
export const Navbar: React.FC = () => {
    const navBarLinkButtonStyle = {
        color: "white",
        backgroundColor: '#f1356d',
        borderRadius: '8px'
    };

    return (
        <nav className="navbar">
            <h1>The Dojo Blog</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/create" style={ navBarLinkButtonStyle }>New Blog</a>
            </div>
        </nav>
    );
}
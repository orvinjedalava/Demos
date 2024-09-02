import { Link, useNavigate, NavigateFunction } from 'react-router-dom';
import { useAuth } from '../authentications/AuthContext';

// React.FC is short for React.FunctionComponent. It is a type that describes a function component. 
// It is a generic type that takes props as a type argument.
export const Navbar: React.FC = () => {
    const navBarLinkButtonStyle = {
        color: "white",
        backgroundColor: '#f1356d',
        borderRadius: '8px',
        cursor: 'pointer'
    };

    const navBarLoginButtonStyle = {
        color: "white",
        backgroundColor: 'green',
        borderRadius: '8px',
        cursor: 'pointer'
    };

    const navBarLogoutButtonStyle = {
        color: "white",
        backgroundColor: 'blue',
        borderRadius: '8px',
        cursor: 'pointer'
    };

    const navigate: NavigateFunction = useNavigate();
    const { isAuthenticated, loginBasic, logout } = useAuth();

    const handleLogin = () => {
        navigate('/login');
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <nav className="navbar">
            <h1>The Dojo Blog</h1>
            <div className="links">
                 {isAuthenticated && <Link to="/">Home</Link>}
                 {isAuthenticated && <Link to="/create" style={ navBarLinkButtonStyle }>New Blog</Link>}
                 {isAuthenticated && <a style={navBarLogoutButtonStyle} onClick={handleLogout}>Logout</a>}
            </div>
        </nav>
    );
}
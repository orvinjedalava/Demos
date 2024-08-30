import React from 'react';
import logo from './logo.svg';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Create } from './components/Create';
import { BlogDetails } from './components/BlogDetails';
import { NotFound } from './components/NotFound';
import { Login } from './authentications/Login';
import { PrivateRoute } from './authentications/PrivateRoute';
import { AuthProvider } from './authentications/AuthContext';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute element={<Home />} />} />
              <Route path="/create" element={<PrivateRoute element={<Create />} />} />
              <Route path="/blogs/:id" element={<PrivateRoute element={<BlogDetails />} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

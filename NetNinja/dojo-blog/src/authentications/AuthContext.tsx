import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is a custom hook that will be used to access the AuthContext.
// { children: React.ReactNode } is a TypeScript syntax that says the object passed to AuthProvider must have a property named children that is of type React.ReactNode.
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = () => {
    const loginBasicUrl: string | undefined = process.env.REACT_APP_LOGIN_BASIC_API_URL;

    if (!loginBasicUrl) {
      throw new Error('REACT_APP_LOGIN_BASIC_API_URL is undefined');
    }

    const encodedCredentials = btoa(`${process.env.REACT_APP_LOGIN_BASIC_USERNAME}:${process.env.REACT_APP_LOGIN_BASIC_PASSWORD}`)
    
    const abortController = new AbortController();

    fetch(loginBasicUrl as string, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`
      }, 
      signal: abortController.signal 
      })
      .then((res: Response) => {
          if (!res.ok) {
              throw Error('Could not login url');
          }
          setIsAuthenticated(true);
      })
      .catch((err: Error) => {
          if (err.name === 'AbortError') {
              console.log('login aborted'); 
          } 
          else { 
              console.log(err.message);
          }
      })
  }
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
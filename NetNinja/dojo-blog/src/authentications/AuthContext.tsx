import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  loginBasic: () => Promise<boolean>;
  jwtToken: JwtToken | null;
  loginJwt: () => Promise<boolean>;
  logout: () => void;
}

interface JwtToken {
  access_token: string;
  token_type: string;
  expires_in: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is a custom hook that will be used to access the AuthContext.
// { children: React.ReactNode } is a TypeScript syntax that says the object passed to AuthProvider must have a property named children that is of type React.ReactNode.
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [jwtToken, setJwtToken] = useState<JwtToken | null>(null);

  // define the function that will be used to login using basic authentication
  const loginBasic = async (): Promise<boolean> => {
    const loginBasicUrl: string | undefined = process.env.REACT_APP_LOGIN_BASIC_API_URL;

    if (!loginBasicUrl) {
      throw new Error('REACT_APP_LOGIN_BASIC_API_URL is undefined');
    }

    const encodedCredentials = btoa(`${process.env.REACT_APP_LOGIN_USERNAME}:${process.env.REACT_APP_LOGIN_PASSWORD}`)
    
    const abortController = new AbortController();

    try {
      const res: Response = await fetch(loginBasicUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${encodedCredentials}`
        },
        signal: abortController.signal
      });

      if (!res.ok) {
        throw new Error('Could not login url');
      }

      setIsAuthenticated(true);

      return true;
      
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('login aborted');
      } else {
        console.log(err.message);
      }
      return false;
    }
  }

  // define the function that will be used to login using jwt authentication
  const loginJwt = async (): Promise<boolean> => {
    const loginJwtUrl: string | undefined = process.env.REACT_APP_LOGIN_JWT_API_URL;

    if (!loginJwtUrl) {
      throw new Error('REACT_APP_LOGIN_JWT_API_URL is undefined');
    }

    const encodedCredentials = btoa(`${process.env.REACT_APP_LOGIN_USERNAME}:${process.env.REACT_APP_LOGIN_PASSWORD}`)
    
    const abortController = new AbortController();

    try {
      const formData = new URLSearchParams({
        grant_type: 'client_credentials'
      }).toString();

      const res: Response = await fetch(loginJwtUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData,
        signal: abortController.signal
      });

      if (!res.ok) {
        throw new Error('Could not login url');
      }

      const data: JwtToken = await res.json();
      setJwtToken(data);

      setIsAuthenticated(true);

      return true;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('login aborted');
      } else {
        console.log(err.message);
      }
      return false;
    }
  }

  // define the function that will be used to logout
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginBasic, loginJwt, jwtToken, logout }}>
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
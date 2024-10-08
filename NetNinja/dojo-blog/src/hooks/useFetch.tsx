import { useState, useEffect } from 'react';
import { Data } from '../types/MyTypes';
import { useAuth } from '../authentications/AuthContext';

export const useFetch = (url: string) => {

    const[data, setData] = useState<Data[] | Data>([]);
    const[isPending, setIsPending] = useState<boolean>(true);
    const[error, setError] = useState<string | null>(null);
    const { jwtToken } = useAuth();

    // This is the function that is going to run everytime there is a re-render
    // We can pass a dependency array to indicate the objects that it keeps track of before running the useEffect function.
    useEffect(() => {
        const abortController = new AbortController();

        console.log('useEffect ran for url: ' + url)

        setTimeout(() => {
            fetch(url, { 
                headers: {
                    'Authorization': `Bearer ${jwtToken?.access_token}`
                  },
                signal: abortController.signal })
                .then((res: Response) => {
                    if (!res.ok) {
                        throw Error('Could not fetch the data for that resource');
                    }
                    return res.json();
                })
                .then((data: Data[] | Data) => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch((err: Error) => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted'); 
                    } 
                    else { 
                        setError(err.message);
                        setIsPending(false);
                    }
                    
                })
        }, 1000);

        return () => abortController.abort();
    }, [url]);

    return { data, isPending, error };
}
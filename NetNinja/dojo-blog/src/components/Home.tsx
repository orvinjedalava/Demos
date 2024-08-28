import { useState } from 'react';

export const Home: React.FC = () => {
    const [name, setName] = useState('jed');
    const [age, setAge] = useState(25);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setName('mel');
        setAge(20);
    }

    return (
        <div className="home">
            <h2>Homepage</h2>
            <p>{ name } is { age } years old</p>
            <button onClick={handleClick}>Click Me</button>
        </div>
    )
}
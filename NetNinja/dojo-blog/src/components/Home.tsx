export const Home: React.FC = () => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('Hello, ninjas', e);
    }

    const handleClickAgain = (name: string, e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('hello ' + name, e.target);
    }

    return (
        <div className="home">
            <h2>Homepage</h2>
            <button onClick={handleClick}>Click Me</button>
            <button onClick={(e) => handleClickAgain('Jed', e)}>Click me again</button>
        </div>
    )
}
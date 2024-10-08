import React, { useState, useEffect } from 'react';

interface InputTextProps {
    value: string;
    onChange: (value: string) => void;
}

const InputText: React.FC<InputTextProps> = ({ value, onChange }) => {
    const [text, setText] = useState(value);

    useEffect(() => {
        setText(value);
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newText = event.target.value;
        setText(newText);
        onChange(newText);
    };

    return (
        <input
            type="text"
            value={text}
            onChange={handleChange}
        />
    );
};

export default InputText;
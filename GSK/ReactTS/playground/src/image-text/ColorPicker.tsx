import React, { useState, useEffect } from 'react';

interface ColorPickerProps {
    value: string;
    onChange: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
    const [color, setColor] = useState(value);

    useEffect(() => {
        setColor(value);
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = event.target.value;
        setColor(newColor);
        onChange(newColor);
    };

    return (
        <input
            type="color"
            value={color}
            onChange={handleChange}
        />
    );
};

export default ColorPicker;
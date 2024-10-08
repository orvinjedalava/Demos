import React, { useState, useEffect } from 'react';

interface SliderProps {
    id: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ id, value, min, max, step, onChange }) => {
    const [sliderValue, setSliderValue] = useState(value);

    useEffect(() => {
        setSliderValue(value);
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setSliderValue(newValue);
        onChange(newValue);
    };

    return (
        <input
            id={id}
            type="range"
            value={sliderValue}
            min={min}
            max={max}
            step={step}
            onChange={handleChange}
        />
    );
};

export default Slider;
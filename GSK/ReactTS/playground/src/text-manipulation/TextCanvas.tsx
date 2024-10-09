import React, { useRef, useState, useEffect } from 'react';

interface TextObject {
    id: number;
    text: string;
    x: number;
    y: number;
    color: string;
    fontSize: number;
}

const TextCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [texts, setTexts] = useState<TextObject[]>([]);
    const [currentText, setCurrentText] = useState("");
    const [textColor, setTextColor] = useState("#000000");
    const [fontSize, setFontSize] = useState(20);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        drawTexts();
    }, [texts]);

    const drawTexts = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        texts.forEach(text => {
            ctx.font = `${text.fontSize}px Arial`;
            ctx.fillStyle = text.color;
            ctx.fillText(text.text, text.x, text.y);
        });
    };

    const addText = () => {
        const newText: TextObject = {
            id: texts.length,
            text: currentText,
            x: 50,
            y: 50,
            color: textColor,
            fontSize: fontSize,
        };
        setTexts([...texts, newText]);
        setCurrentText("");
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        for (let i = 0; i < texts.length; i++) {
            const text = texts[i];
            const textWidth = text.text.length * text.fontSize * 0.6; // Approximate width
            const textHeight = text.fontSize; // Approximate height

            if (x >= text.x && x <= text.x + textWidth && y >= text.y - textHeight && y <= text.y) {
                setDraggingIndex(i);
                setOffset({ x: x - text.x, y: y - text.y });
                break;
            }
        }
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (draggingIndex === null) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const newTexts = [...texts];
        newTexts[draggingIndex] = {
            ...newTexts[draggingIndex],
            x: x - offset.x,
            y: y - offset.y,
        };
        setTexts(newTexts);
    };

    const handleMouseUp = () => {
        setDraggingIndex(null);
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ border: '1px solid black' }}
            ></canvas>
            <div>
                <input
                    type="text"
                    value={currentText}
                    onChange={(e) => setCurrentText(e.target.value)}
                    placeholder="Enter text"
                />
                <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                />
                <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    placeholder="Font size"
                />
                <button onClick={addText}>Add Text</button>
            </div>
        </div>
    );
};

export default TextCanvas;
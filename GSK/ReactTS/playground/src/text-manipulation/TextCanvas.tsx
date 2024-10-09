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
    const [textColor, setTextColor] = useState("#ffffff");
    const [fontSize, setFontSize] = useState(20);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        drawTexts();
    }, [texts, image]);

    useEffect(() => {
        drawTexts();

        if (selectedIndex !== null) {
            const text = texts[selectedIndex];
            setCurrentText(text.text);
            setTextColor(text.color);
            setFontSize(text.fontSize);
        }
        else
        {
            setCurrentText('');
            setTextColor("#ffffff");
            setFontSize(20);
        }
    }, [selectedIndex])

    const drawTexts = () => {
        // console.log('drawTexts');
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Fill the canvas with black color
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // console.log('drawTexts entering forEach');

        if (image) {
            ctx.drawImage(image, 10, 10, 300, 300);
        }

        texts.forEach((text, index) => {
            ctx.font = `${text.fontSize}px Arial`;
            ctx.fillStyle = text.color;
            ctx.fillText(text.text, text.x, text.y);

            // console.log(`drawTexts selectedIndex: ${draggingIndex}`);

            if (index === selectedIndex) {
                const textWidth = ctx.measureText(text.text).width + 5;
                const textHeight = text.fontSize + 5;
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.strokeRect(text.x, text.y - textHeight, textWidth, textHeight);

                // console.log(`drawTexts strokeRect: ${draggingIndex}`);
            }
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
        // console.log('handleMouseDown');
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        

        setSelectedIndex(null);

        for (let i = 0; i < texts.length; i++) {
            // console.log(`x: ${x}, y: ${y}, event.clientX: ${event.clientX}, event.clientY: ${event.clientY}, rect.left: ${rect.left}, rect.top: ${rect.top}`);
            // console.log(`texts[${i}].x: ${texts[i].x}, texts[${i}].y: ${texts[i].y}`);
            const text = texts[i];
            const textWidth = text.text.length * text.fontSize * 0.6; // Approximate width
            const textHeight = text.fontSize; // Approximate height

            if (x >= text.x && x <= text.x + textWidth && y >= text.y - textHeight && y <= text.y) {
                // console.log(`handlemousedown index: ${i}`);
                setDraggingIndex(i);
                setSelectedIndex(i);
                // console.log(`handlemousedown ${draggingIndex}`);
                setOffset({ x: x - text.x, y: y - text.y });
                break;
            }
        }
        
        // drawTexts();
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

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        console.log('handleDrop');
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const img = new Image();
            img.onload = () => setImage(img);
            img.src = URL.createObjectURL(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        console.log('handleDragOver');
        event.preventDefault();
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
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                    border: '2px dashed #ccc',
                    padding: '20px',
                    marginBottom: '20px',
                    textAlign: 'center',
                }}
            >
                Drag and drop an image here
            </div>
        </div>
    );
};

export default TextCanvas;
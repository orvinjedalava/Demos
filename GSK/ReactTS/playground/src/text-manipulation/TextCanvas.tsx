import React, { useRef, useState, useEffect } from 'react';

interface CanvasObject {
    id: number;
    text: string;
    x: number;
    y: number;
    color: string;
    fontSize: number;

    image: HTMLImageElement | null;
    height: number;
    width: number;
}

const TextCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasObjs, setCanvasObjs] = useState<CanvasObject[]>([]);
    const [currentText, setCurrentText] = useState("");
    const [textColor, setTextColor] = useState("#ffffff");
    const [fontSize, setFontSize] = useState(20);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        drawTexts();
    }, [canvasObjs]);

    useEffect(() => {
        // drawTexts();
        // console.log('useEffect image');
        if (image) {
            const newImage: CanvasObject = {
                id: canvasObjs.length,
                text: '',
                x: 10,
                y: 10,
                color: '#ffffff',
                fontSize: 0,
                image: image,
                height: 300,
                width: 300,
            };
            setCanvasObjs([...canvasObjs, newImage]);
        }
    }, [image])

    useEffect(() => {
        drawTexts();

        if (selectedIndex !== null) {
            const text = canvasObjs[selectedIndex];
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

        // if (image) {
        //     ctx.drawImage(image, 10, 10, 300, 300);
        // }

        canvasObjs.forEach((canvasObj, index) => {

            if (canvasObj.image) {
                // console.log('drawTexts Image');
                ctx.drawImage(canvasObj.image, canvasObj.x, canvasObj.y, canvasObj.width, canvasObj.height);
                if (index === selectedIndex) {
                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(canvasObj.x, canvasObj.y, canvasObj.width, canvasObj.height);
                }
            }
            else
            {
                ctx.font = `${canvasObj.fontSize}px Arial`;
                ctx.fillStyle = canvasObj.color;
                ctx.fillText(canvasObj.text, canvasObj.x, canvasObj.y);

                // console.log(`drawTexts selectedIndex: ${draggingIndex}`);

                if (index === selectedIndex) {
                    const textWidth = ctx.measureText(canvasObj.text).width;
                    const textHeight = canvasObj.fontSize;
                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(canvasObj.x, canvasObj.y - textHeight, textWidth, textHeight);

                    // console.log(`drawTexts strokeRect: ${draggingIndex}`);
                }
            }
        });
    };

    const addText = () => {
        const newText: CanvasObject = {
            id: canvasObjs.length,
            text: currentText,
            x: 50,
            y: 50,
            color: textColor,
            fontSize: fontSize,
            image: null,
            height: 0,
            width: 0,
        };
        setCanvasObjs([...canvasObjs, newText]);
        setCurrentText("");
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        console.log('handleMouseDown');
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setSelectedIndex(null);

        for (let i = 0; i < canvasObjs.length; i++) {
            // console.log(`x: ${x}, y: ${y}, event.clientX: ${event.clientX}, event.clientY: ${event.clientY}, rect.left: ${rect.left}, rect.top: ${rect.top}`);
            // console.log(`texts[${i}].x: ${texts[i].x}, texts[${i}].y: ${texts[i].y}`);
            const canvasObj = canvasObjs[i];

            if (canvasObj.image) {
                console.log('handleMouseDown Image');
                const imageWidth = canvasObj.width;
                const imageHeight = canvasObj.height;

                if (x >= canvasObj.x && x <= canvasObj.x + imageWidth && y >= canvasObj.y && y <= canvasObj.y + imageHeight) {
                    // console.log(`handlemousedown index: ${i}`);
                    setDraggingIndex(i);
                    setSelectedIndex(i);
                    // console.log(`handlemousedown ${draggingIndex}`);
                    setOffset({ x: x - canvasObj.x, y: y - canvasObj.y });
                    break;
                }
            }
            else
            {
                console.log('handleMouseDown Text');
                const textWidth = canvasObj.text.length * canvasObj.fontSize * 0.6; // Approximate width
                const textHeight = canvasObj.fontSize; // Approximate height

                if (x >= canvasObj.x && x <= canvasObj.x + textWidth && y >= canvasObj.y - textHeight && y <= canvasObj.y) {
                    // console.log(`handlemousedown index: ${i}`);
                    setDraggingIndex(i);
                    setSelectedIndex(i);
                    // console.log(`handlemousedown ${draggingIndex}`);
                    setOffset({ x: x - canvasObj.x, y: y - canvasObj.y });
                    break;
                }
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

        const newTexts = [...canvasObjs];
        newTexts[draggingIndex] = {
            ...newTexts[draggingIndex],
            x: x - offset.x,
            y: y - offset.y,
        };
        setCanvasObjs(newTexts);
    };

    const handleMouseUp = () => {
        setDraggingIndex(null);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        // console.log('handleDrop');
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const img = new Image();
            img.onload = () => setImage(img);
            img.src = URL.createObjectURL(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        // console.log('handleDragOver');
        event.preventDefault();
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
        console.log('handleKeyDown via Canvas');
        if (event.key === 'Delete' && selectedIndex !== null) {
            const newCanvasObjs = canvasObjs.filter((_, index) => index !== selectedIndex);
            setCanvasObjs(newCanvasObjs);
            setSelectedIndex(null);
        }
    };

    // useEffect(() => {
    //     const handleKeyDown = (event: KeyboardEvent) => {
    //         console.log('handleKeyDown via UseEffect');
    //         if (event.key === 'Delete' && selectedIndex !== null) {
    //             const newCanvasObjs = canvasObjs.filter((_, index) => index !== selectedIndex);
    //             setCanvasObjs(newCanvasObjs);
    //             setSelectedIndex(null);
    //         }
    //     };

    //     window.addEventListener('keydown', handleKeyDown);

    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, []);

    return (
        <div>
            <canvas
                tabIndex={0}
                ref={canvasRef}
                width={800}
                height={600}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onKeyDown={handleKeyDown}
                
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
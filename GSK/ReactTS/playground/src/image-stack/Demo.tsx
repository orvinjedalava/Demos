import React, { useEffect, useRef, useState } from 'react';
import BugsBunny from './BugsBunny.jpg';

export default function Demo() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [images, setImages] = useState<string[]>(['./BugsBunny.jpg',
        './Banner.png']);

    // setImages(['./BugsBunny.jpg',
    //     './Banner.png'])

    // const images = [
    //     './BugsBunny.jpg',
    //     './Banner.png'
        
    // ];

    useEffect(() => {
        const canvas = canvasRef.current;
        const imageElements: HTMLImageElement[] = [];
        if (canvas) {

            console.log('test');
            const context = canvas.getContext('2d');
            if (context) {
                console.log('test2');
                // const loadImage = (src: string) => {
                //     return new Promise<HTMLImageElement>((resolve, reject) => {
                //         const img = new Image();
                //         img.src = src;
                //         img.onload = () => resolve(img);
                //         img.onerror = reject;
                //     });
                // }

                images.forEach((img) => {
                    console.log(img);
                    const image = new Image();
                    // image.src = require('./BugsBunny.jpg');
                    image.src = BugsBunny;
                    // image.src = require(img);
                    image.onload = () => {
                        context.drawImage(image, 0, 0, canvas.width, canvas.height);
                    };
                });

                // const image = new Image();
                // image.onload = function(res) {
                //     console.log("res", res);
                //     context.drawImage(image, 0, 0);
                // };
                // image.onerror = function(err) {
                //     console.log("err", err);
                // };
                // image.src = require("./BugsBunny.jpg");
            };

        //         const drawImages = async () => {
        //             const loadedImages = await Promise.all(images.map(loadImage));
        //             loadedImages.forEach((img) => {
        //                 context.drawImage(img, 0, 0, canvas.width, canvas.height);
        //             });
        //         };

        //         drawImages();
        //     }
        }
    }, [images]);

    return (
        <div>
            <canvas ref={canvasRef} width={500} height={500}></canvas>
        </div>
    );
}
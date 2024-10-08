// "use client"

import React, { useRef, useEffect, useState } from 'react'

interface ImageCanvasProps {
  imageUrls: string[]
}

export default function ImageCanvas({ imageUrls }: ImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  const [title, setTitle] = useState("IT'S DUCK SEASON!");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // const loadAndDrawImages = async () => {
    //   if (!canvasRef.current) return

    //   const ctx = canvasRef.current.getContext('2d')
    //   if (!ctx) return

    //   // Clear the canvas
    //   ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

    //   const loadImage = (url: string): Promise<HTMLImageElement> => {
    //     return new Promise((resolve, reject) => {
    //       const img = new Image()
    //       img.crossOrigin = "anonymous"
    //       img.onload = () => resolve(img)
    //       img.onerror = (err) => reject(err)
    //       img.src = url
    //     })
    //   }

    //   try {
    //     const images = await Promise.all(imageUrls.map(loadImage))
        
    //     // Calculate the size for each image
    //     const imageWidth = canvasSize.width / images.length
    //     const imageHeight = canvasSize.height

    //     // Draw images
    //     images.forEach((img, index) => {
    //       ctx.drawImage(
    //         img,
    //         index * imageWidth,
    //         0,
    //         imageWidth,
    //         imageHeight
    //       )
    //     })
    //   } catch (error) {
    //     console.error("Error loading images:", error)
    //   }
    // }

    // loadAndDrawImages()
    drawCanvas();
  }, [imageUrls, canvasSize])

  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect()
        setCanvasSize({ width, height: width * 0.5625 }) // 16:9 aspect ratio
      }
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    if (titleRef.current) {
      titleRef.current.value = title;
    }

    return () => window.removeEventListener('resize', updateCanvasSize)
  }, [])

  const saveCanvasAsImage = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = image
    link.download = 'canvas-image.png'
    link.click()
  }

  const handleSetTitle = () => {
    if (titleRef.current) {
      setTitle(titleRef.current.value);
        drawCanvas();
    }
  }

  const drawCanvas = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    const loadAndDrawImages = async () => {
        
        if (!ctx) return
  
        // Clear the canvas
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)
  
        const loadImage = (url: string): Promise<HTMLImageElement> => {
          return new Promise((resolve, reject) => {
            const img = new Image()
            img.crossOrigin = "anonymous"
            img.onload = () => resolve(img)
            img.onerror = (err) => reject(err)
            img.src = url
          })
        }
  
        try {
          const images = await Promise.all(imageUrls.map(loadImage))
          
          // Calculate the size for each image
          const imageWidth = canvasSize.width / images.length
          const imageHeight = canvasSize.height
  
          // Draw images
          images.forEach((img, index) => {
            ctx.drawImage(
              img,
              index * imageWidth,
              0,
              imageWidth,
              imageHeight
            )
          })
        } catch (error) {
          console.error("Error loading images:", error)
        }
      }
  
      loadAndDrawImages()
      .then(() => {
        drawTitle();
      })
      .then(() => { 
        if (ctx) {
          drawSvg(ctx, 'http://localhost:5000/MantelGroupIcon.svg'); 
        }
    })
    .then(() => {   
        if (ctx) {
            drawButton(ctx);
        }
    }
    )
    //   drawTitle();
  }

  const drawTitle = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // ctx.font = `${text.fontSize}px Arial`;
    ctx.font = `50px Arial`;
    // ctx.fillStyle = text.color;
    ctx.fillStyle = 'white';
    // ctx.fillText(text.text, text.x, text.y);
    ctx.fillText(title, 350, 130);

    // ctx.strokeText(title, 40, 50);
  };

  const drawSvg = (ctx: CanvasRenderingContext2D, svgUrl: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        fetch(svgUrl)
            .then(response => response.text())
            .then(svgText => {
                const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(svgBlob);
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, canvasSize.width - 100, 50, 50, 50);
                    URL.revokeObjectURL(url);
                    resolve();
                };
                img.onerror = (err) => {
                    URL.revokeObjectURL(url);
                    reject(err);
                };
                img.src = url;
            })
            .catch(reject);
    });
};

const drawButton = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'orange';
    ctx.fillRect(500, 250, 150, 50);
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    // ctx.textAlign = 'center';
    ctx.fillText('Take Action', 521, 282);

    // Add border
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(500, 250, 150, 50);
};


  return (
    <div ref={containerRef} className="w-full">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="w-full h-auto"
      />
      <button onClick={saveCanvasAsImage}>Save as Image</button>
        <div>
            <input
                type="text"
                // value={title}
                ref={titleRef}
                onChange={(e) => setTitle(e.target.value)}
                // className="mt-2 p-1 border rounded"
            />
            <button onClick={handleSetTitle}>Set Title</button>
        </div>
    </div>
  )
}
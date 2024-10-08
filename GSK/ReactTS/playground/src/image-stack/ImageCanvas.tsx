// "use client"

import React, { useRef, useEffect, useState } from 'react'

interface ImageCanvasProps {
  imageUrls: string[]
}

export default function ImageCanvas({ imageUrls }: ImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  const [title, setTitle] = useState("This is the Title");
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
    const loadAndDrawImages = async () => {
        if (!canvasRef.current) return
  
        const ctx = canvasRef.current.getContext('2d')
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
      });
    //   drawTitle();
  }

  const drawTitle = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // ctx.font = `${text.fontSize}px Arial`;
    ctx.font = `40px Arial`;
    // ctx.fillStyle = text.color;
    ctx.fillStyle = 'white';
    // ctx.fillText(text.text, text.x, text.y);
    ctx.fillText(title, 450, 570);

    // ctx.strokeText(title, 40, 50);
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
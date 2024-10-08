// "use client"

import React, { useRef, useEffect, useState } from 'react'

interface ImageCanvasProps {
  imageUrls: string[]
}

export default function ImageCanvas({ imageUrls }: ImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
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

  return (
    <div ref={containerRef} className="w-full">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="w-full h-auto"
      />
      <button onClick={saveCanvasAsImage}>Save as Image</button>
    </div>
  )
}
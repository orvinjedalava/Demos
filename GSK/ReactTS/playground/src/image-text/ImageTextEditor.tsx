// export default function ImageTextEditor() {
//     return ( <div></div>)
// }

// "use client"

import React, { useRef, useEffect, useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Slider } from "@/components/ui/slider"
import InputText from "./InputText"
// import { Label } from "@/components/ui/label"
import Slider from "./Slider"


interface TextObject {
  id: number
  text: string
  x: number
  y: number
  color: string
  fontSize: number
}

export default function ImageTextEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageUrl, setImageUrl] = useState("/placeholder.svg?height=400&width=600")
  const [texts, setTexts] = useState<TextObject[]>([])
  const [currentText, setCurrentText] = useState("")
  const [textColor, setTextColor] = useState("#000000")
  const [fontSize, setFontSize] = useState(20)
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      drawTexts()
    }
    img.src = imageUrl
  }, [imageUrl])

  useEffect(() => {
    drawTexts()
  }, [texts])

  const drawTexts = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      texts.forEach(textObj => {
        ctx.font = `${textObj.fontSize}px Arial`
        ctx.fillStyle = textObj.color
        ctx.fillText(textObj.text, textObj.x, textObj.y)
      })
    }
    img.src = imageUrl
  }

  const addText = () => {
    if (currentText) {
      setTexts([...texts, {
        id: Date.now(),
        text: currentText,
        x: 50,
        y: 50,
        color: textColor,
        fontSize: fontSize
      }])
      setCurrentText("")
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const clickedTextIndex = texts.findIndex(text => 
      x >= text.x && x <= text.x + 100 && y >= text.y - text.fontSize && y <= text.y
    )

    if (clickedTextIndex !== -1) {
      setDraggingIndex(clickedTextIndex)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (draggingIndex === null) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setTexts(prevTexts => prevTexts.map((text, index) => 
      index === draggingIndex ? { ...text, x, y } : text
    ))
  }

  const handleMouseUp = () => {
    setDraggingIndex(null)
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="mb-4">
        <canvas
          ref={canvasRef}
        //   className="border border-gray-300 w-full h-auto"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
      <div className="grid gap-4">
        <div>
          <label htmlFor="text-input">Add Text</label>
          <div className="flex gap-2">
            <input
              id="text-input"
              type="text"
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              placeholder="Enter text"
            />
            {/* <Button onClick={addText}>Add</Button> */}
            <button onClick={addText}>Add</button>
          </div>
        </div>
        <div>
          <label htmlFor="color-input">Text Color</label>
          <input
            id="color-input"
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-full h-10"
          />
        </div>
        <div>
          <label htmlFor="font-size-slider">Font Size</label>
          <Slider
            id="font-size-slider"
            min={10}
            max={50}
            step={1}
            // value={[fontSize]}
            value={fontSize}
            // onValueChange={(value) => setFontSize(value[0])}
            onChange={(value) => setFontSize(value)}
          />
        </div>
      </div>
    </div>
  )
}
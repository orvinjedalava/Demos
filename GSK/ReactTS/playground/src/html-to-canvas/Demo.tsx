"use client"

import React, { useRef, useState } from 'react'
// import { Button } from "@/components/ui/button"
import html2canvas from 'html2canvas'

export default function Demo() {
  const divRef = useRef<HTMLDivElement>(null)
  const [isConverting, setIsConverting] = useState(false)

  const convertToImage = async (format: 'jpg' | 'png') => {
    if (!divRef.current) return

    setIsConverting(true)

    try {
      const canvas = await html2canvas(divRef.current)
      const image = canvas.toDataURL(`image/${format}`)
      
      const link = document.createElement('a')
      link.href = image
      link.download = `converted-image.${format}`
      link.click()
    } catch (error) {
      console.error('Error converting to image:', error)
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div 
        ref={divRef} 
        className="p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Sample HTML Content</h2>
        <p className="mb-2">This is a paragraph of text.</p>
        <ul className="list-disc pl-5 mb-2">
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
        <div className="bg-blue-100 p-2 rounded">
          This is a nested div with a different background color.
        </div>
      </div>
      
      <div className="space-x-2">
        <button 
          onClick={() => convertToImage('jpg')} 
          disabled={isConverting}
        >
          Save as JPG
        </button>
        <button 
          onClick={() => convertToImage('png')} 
          disabled={isConverting}
        >
          Save as PNG
        </button>
      </div>
      
      {isConverting && (
        <p className="text-sm text-gray-500">Converting...</p>
      )}
    </div>
  )
}
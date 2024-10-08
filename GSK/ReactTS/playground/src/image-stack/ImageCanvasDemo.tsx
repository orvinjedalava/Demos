import ImageCanvas from './ImageCanvas'

export default function ImageCanvasDemo() {
//   const imageUrls = [
//     "/placeholder.svg?height=300&width=300",
//     "/placeholder.svg?height=300&width=300",
//     "/placeholder.svg?height=300&width=300",
//   ]

  const imageUrls = [
    // "./BugsBunny.jpg?height=300&width=300",
    // "/Banner.png?height=300&width=300"
    'http://localhost:5000/BugsBunny.jpg',
    'http://localhost:5000/Banner.png',
    'http://localhost:5000/flower.jpg'
  ]

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Image Canvas Demo</h1>
      <ImageCanvas imageUrls={imageUrls} />
    </div>
  )
}
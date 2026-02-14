import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

type ConfettiItem = {
  id: number
  x: number
  y: number
  rotation: number
  delay: number
  size: number
  drift: number
}

export const Confetti = () => {
  const [items, setItems] = useState<ConfettiItem[]>([])

  useEffect(() => {
    // Create 200 confetti items for a heavy rain effect
    const newItems: ConfettiItem[] = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Random horizontal position (0-100%)
      y: -10 - Math.random() * 20, // Start above viewport
      rotation: Math.random() * 360,
      delay: Math.random() * 0.5,
      size: 16 + Math.random() * 12, // Size between 16-28px
      drift: (Math.random() - 0.5) * 200, // Random horizontal drift
    }))

    setItems(newItems)

    // Clean up after animation completes (10 seconds)
    const timer = setTimeout(() => {
      setItems([])
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  if (items.length === 0) return null

  return (
    <>
      <style>{`
        @keyframes confetti-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {items.map((item) => {
          const rotationEnd = item.rotation + 720 // Full rotation plus initial
          return (
            <div
              key={item.id}
              className="absolute"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                animation: `confetti-fall-${item.id} 10s ease-out ${item.delay}s forwards`,
              }}
            >
              <style>{`
                @keyframes confetti-fall-${item.id} {
                  0% {
                    transform: translateY(0) translateX(0) rotate(${item.rotation}deg);
                    opacity: 1;
                  }
                  100% {
                    transform: translateY(100vh) translateX(${item.drift}px) rotate(${rotationEnd}deg);
                    opacity: 0;
                  }
                }
              `}</style>
              <Heart
                size={item.size}
                className="text-pink-500 fill-pink-500"
                style={{
                  animation: `confetti-spin 2s linear ${item.delay}s infinite`,
                }}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

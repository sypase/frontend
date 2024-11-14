import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"


interface Variant {
  id: number
  text: string
}

interface CarouselDApiDemoProps {
  variants: Variant[]
}

export function CarouselDApiDemo({ variants }: CarouselDApiDemoProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const handleCopy = () => {
    const currentVariant = variants[current - 1];
    
    if (currentVariant) {
      navigator.clipboard.writeText(currentVariant.text).then(() => {
        // Display a toast message instead of an alert
        const toast = document.createElement("div");
        toast.textContent = "Text copied successfully";
        toast.className = "fixed top-4 left-1/2 z-50 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-4 rounded shadow-lg";
        toast.style.backgroundColor = "#272727";
        toast.style.color = "#32CD32"; // Changed text color to a darker green
        toast.style.borderRadius = "8px";
        document.body.appendChild(toast);

        setTimeout(() => {
          document.body.removeChild(toast);
        }, 3000);
      }).catch(err => {
        console.error("Failed to copy text: ", err);
      });
    }
  };

  return (
    <div className="mx-auto max-w-full overflow-hidden ">
      <Carousel setApi={setApi} className="w-full max-w-full bg-neutral-950 text-white">
        <CarouselContent className="flex">
          {variants.map((variant) => (
            <CarouselItem key={variant.id} className="flex-shrink-0 w-full">
              <Card className="bg-gray-800 text-white shadow-lg rounded-md w-full">
                <CardContent className="flex items-center justify-center p-2">
                  <span className="text-lg m-0">{variant.text}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 text-gray-400 hover:text-white transition duration-300" />
        <CarouselNext className="absolute right-0 text-gray-400 hover:text-white transition duration-300" />
      </Carousel>
      <div className="py-2 text-center text-sm text-gray-400">
        Variant {current} of {count}
      </div>
      <div className="flex justify-center py-2">
  <button
    onClick={handleCopy}
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
  >
    Copy
  </button>
</div>

    </div>
  )
}

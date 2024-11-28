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
import { toast, ToastContainer } from 'react-toastify';




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
        toast.success("Copied to clipboard!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#272727",
            color: "#fff",
            borderRadius: "8px",
          },
        });
      }).catch((err: any) => {
        toast.error("Failed to copy text.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#272727",
            color: "#fff",
            borderRadius: "8px",
          },
        });
      });
    }
  };

  return (
    <div className="mx-auto max-w-full overflow-hidden ">
      <Carousel setApi={setApi} className="w-full max-w-full bg-gray-800 text-white">
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

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

  return (
    <div className="mx-auto max-w-full overflow-hidden">
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

    </div>
  )
}

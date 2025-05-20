import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import config from '../config.json'
import { Button } from '@/components/ui/button'
import { Circle, CircleCheck, Heart, Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import '../styles/css/ProductFront.css'

const AppProductFront: React.FC<IProductFrontProps> = ({
  name,
  price,
  currency,
  description,
  details,
  sizes,
  image,
}) => {
  const [size, setSize] = useState<{ M: string; W: string } | undefined>(
    undefined
  )
  const [color, setColor] = useState<string | undefined>(undefined)

  useEffect(() => {
    const key = Object.keys(sizes)[0]

    setColor(key)
    setSize(sizes[key!]![0])
  }, [])

  return (
    <div className="product__front-subcontainer flex gap-[20px] w-[min(800px,_100%)]">
      <Card className="flex justify-center items-center flex-1">
        <img src={image} alt="CardHeader" className="object-cover" />
      </Card>
      <div className="flex-1">
        <Card className="gap-[10px]">
          <CardHeader>
            <CardTitle>
              {name} — {price + config.currencyCodes[currency]}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{details}</CardContent>
          <CardFooter className="flex flex-col gap-[10px]">
            <div className="grid grid-cols-[repeat(2,_1fr)] gap-[5px] w-full">
              {Object.keys(sizes).map((val, i) => {
                return (
                  <Button
                    key={i}
                    className="flex justify-between"
                    variant={'outline'}
                    onClick={() => {
                      if (color === val) {
                        return
                      }

                      setColor(val)
                    }}
                  >
                    <span>{val.charAt(0).toUpperCase() + val.slice(1)}</span>
                    {color !== val ? <Circle /> : <CircleCheck />}
                  </Button>
                )
              })}
            </div>
            <div className="flex flex-col gap-[5px] w-full">
              {color &&
                sizes[color!]!.map((val, i) => {
                  return (
                    <Button
                      key={i}
                      className="flex justify-between w-full"
                      variant={'outline'}
                      onClick={() => {
                        if (size === val) {
                          return
                        }

                        setSize(val)
                      }}
                    >
                      <span>
                        M {val.M} / W {val.W}
                      </span>
                      {size !== val ? <Circle /> : <CircleCheck />}
                    </Button>
                  )
                })}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default AppProductFront

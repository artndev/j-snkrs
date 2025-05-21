import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Circle, CircleCheck, CirclePlus, Heart, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import config from '../config.json'
import '../styles/css/ProductFront.css'
import { Link } from 'react-router-dom'

const AppProductFront: React.FC<IProductFrontProps> = ({
  name,
  price,
  currency,
  description,
  details,
  sizes,
  image,
}) => {
  const [variant, setVariant] = useState<
    { key: number; size: { M: string; W: string }; color: string } | undefined
  >(undefined)
  const [color, setColor] = useState<string | undefined>(undefined)
  const colors: string[] = Object.keys(sizes)

  useEffect(() => {
    const key = 0
    if (!colors.length) return

    const keyColor = colors[key]
    setColor(keyColor)
    setVariant({
      key: key,
      size: sizes[keyColor!]![key]!,
      color: keyColor!,
    })
  }, [])

  // useEffect(() => {
  //   console.log(color, variant)
  // }, [color, variant])

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
          <CardFooter className="card__footer flex flex-col gap-[10px]">
            {color && (
              <div className="grid grid-cols-[repeat(2,_1fr)] gap-[5px] w-full">
                {colors.map((val, i) => {
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
                      {val.charAt(0).toUpperCase() + val.slice(1)}
                      {color !== val ? <Circle /> : <CircleCheck />}
                    </Button>
                  )
                })}
              </div>
            )}
            {color && variant && (
              <div className="flex flex-col gap-[5px] w-full">
                {sizes[color]!.map((val, i) => {
                  console.log(color, val, i, variant.key, variant.color)
                  return (
                    <Button
                      key={i}
                      className="flex justify-between w-full"
                      variant={'ghost'}
                      onClick={() => {
                        if (variant.key === i && variant.color === color) {
                          return
                        }

                        setVariant({
                          key: i,
                          size: val,
                          color: color,
                        })
                      }}
                    >
                      <span>
                        M {val.M} / W {val.W}
                      </span>
                      {i !== variant.key || color !== variant.color ? (
                        <Circle />
                      ) : (
                        <CircleCheck />
                      )}
                    </Button>
                  )
                })}
              </div>
            )}
            <div className="flex gap-[5px] w-full">
              <Button size={'icon'}>
                <Heart />
              </Button>
              <Button className="flex-1">
                Grab it
                <Plus />
              </Button>
            </div>
            <Link
              className="text-sm text-muted-foreground hover:underline"
              to={'/products'}
            >
              Go to my cart
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default AppProductFront

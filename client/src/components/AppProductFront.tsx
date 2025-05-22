import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Circle,
  CircleCheck,
  CirclePlus,
  Heart,
  Minus,
  Plus,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import config from '../config.json'
import '../styles/css/ProductFront.css'
import { Link } from 'react-router-dom'
import { useReduxDispatch, useReduxSelector } from '../hooks/redux'
import { addProduct, removeProduct } from '@/pizza_slices/Cart'
import { toast } from 'sonner'

const AppProductFront: React.FC<IProductFrontProps> = ({
  id,
  name,
  price,
  currency,
  description,
  details,
  sizes,
  image,
}) => {
  const [variant, setVariant] = useState<IVariant | undefined>(undefined)
  const [color, setColor] = useState<string | undefined>(undefined)
  const colors: string[] = Object.keys(sizes)

  const products = useReduxSelector(state => state.products)
  const dispatch = useReduxDispatch()

  useEffect(() => {
    console.log(products)
  }, [products])

  useEffect(() => {
    const key = 0
    if (!colors.length) return

    setColor(colors[key])
    setVariant({
      key: key,
      size: sizes[colors[key]!]![key]!,
      color: colors[key]!,
    })
  }, [])

  // useEffect(() => {
  //   console.log(color, variant)
  // }, [color, variant])

  return (
    <div className="product__front-subcontainer flex gap-[20px] w-[min(1000px,_100%)]">
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
              {products[id]?.[JSON.stringify(variant)] && (
                <Button
                  size={'icon'}
                  onClick={() => {
                    const totalQuantity =
                      products[id]?.[JSON.stringify(variant)]?.quantity - 1 || 0
                    dispatch(
                      removeProduct({
                        id: id,
                        variant: variant,
                      })
                    )

                    toast(
                      `'${name} • ${color} • M ${variant!.size.M} / W ${variant!.size.W}' has been removed from your cart`,
                      {
                        description: (
                          <span className="text-muted-foreground">
                            Total amount: {totalQuantity}
                          </span>
                        ),
                      }
                    )
                  }}
                >
                  <Minus />
                </Button>
              )}
              <Button
                className="flex-1"
                onClick={() => {
                  const totalQuantity =
                    products[id]?.[JSON.stringify(variant)]?.quantity + 1 || 1
                  dispatch(
                    addProduct({
                      id: id,
                      name: name,
                      price: price,
                      currency: currency,
                      description: description,
                      image: image,
                      variant: variant,
                      quantity: 1,
                    })
                  )

                  toast(
                    `'${name} • ${color!.charAt(0).toUpperCase() + color!.slice(1)} • M ${variant!.size.M} / W ${variant!.size.W}' has been added to your cart`,
                    {
                      description: (
                        <span className="text-muted-foreground">
                          Total amount: {totalQuantity}
                        </span>
                      ),
                    }
                  )
                }}
              >
                Add it
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

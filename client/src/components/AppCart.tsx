import React, { useEffect } from 'react'
import '../styles/css/ProductFront.css'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from './ui/button'
import config from '../config.json'
import { CreditCard, Minus, Plus } from 'lucide-react'
import { useReduxDispatch, useReduxSelector } from '../hooks/redux'
import { addProduct, getTotalPrice, removeProduct } from '@/pizza_slices/Cart'
import { toast } from 'sonner'
import '../styles/css/Cart.css'

const AppCart = () => {
  const products = useReduxSelector(state => state.cart.products)
  const totalPrice = useReduxSelector(getTotalPrice)
  const dispatch = useReduxDispatch()

  //   useEffect(() => {
  //     console.log(products)
  //   }, [products])

  return (
    <>
      <div className="cart flex gap-[20px] w-[min(1000px,_100%)] max-h-[800px]">
        <div className="flex-1 flex flex-col gap-[10px] overflow-y-scroll">
          {Object.keys(products).map(val => {
            return Object.keys(products[val]).map((val2, i) => {
              const product: ICart = products[val][val2]
              const currencyCode = config.currencyCodes[product.currency]

              return (
                <Card
                  key={i}
                  className="grid grid-cols-[repeat(2,_1fr)] gap-[10px]"
                >
                  <div className="flex flex-col gap-[10px]">
                    <CardHeader className="pr-[0px]">
                      <div className="flex justify-center items-center w-full">
                        <img
                          src={product.image}
                          alt="CardHeader"
                          className="object-cover"
                        />
                      </div>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {product.price * product.quantity}
                      {currencyCode}
                    </CardContent>
                  </div>
                  <div>
                    <CardFooter className="flex flex-col items-start gap-[5px] pl-[0px]">
                      <span className="text-muted mb-[10px]">
                        {product.variant.color.charAt(0).toUpperCase() +
                          product.variant.color.slice(1)}{' '}
                        • M {product.variant.size.M} / W{' '}
                        {product.variant.size.W}
                      </span>
                      <Button
                        className="flex justify-between items-center w-full"
                        onClick={() => {
                          const totalQuantity = product.quantity + 1

                          dispatch(addProduct(product))

                          toast(
                            `'${product.name} • ${product.variant.color.charAt(0).toUpperCase() + product.variant.color.slice(1)} • 
                            M ${product.variant.size.M} / W ${product.variant.size.W}' has been added to your cart`,
                            {
                              description: (
                                <span className="text-muted-foreground">
                                  Total: {totalQuantity}
                                </span>
                              ),
                            }
                          )
                        }}
                      >
                        Add it
                        <Plus />
                      </Button>
                      <Button
                        className="flex justify-between items-center w-full"
                        onClick={() => {
                          const totalQuantity = product.quantity - 1

                          dispatch(
                            removeProduct({
                              id: product.id,
                              variant: product.variant,
                            })
                          )

                          toast(
                            `
                            '${product.name} • ${product.variant.color.charAt(0).toUpperCase() + product.variant.color.slice(1)} • 
                            M ${product.variant.size.M} / W ${product.variant.size.W}' has been removed from your cart`,
                            {
                              description: totalQuantity > 0 && (
                                <span className="text-muted-foreground">
                                  Total: {totalQuantity}
                                </span>
                              ),
                            }
                          )
                        }}
                      >
                        Remove it
                        <Minus />
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              )
            })
          })}
        </div>
        <div className="cart__checkout flex-1">
          <Card className="gap-[10px]">
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
              <CardDescription>Make the payment</CardDescription>
            </CardHeader>
            <CardContent>~{totalPrice}</CardContent>
            <CardFooter>
              <Button className="w-full">
                <CreditCard />
                Pay by card
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}

export default AppCart

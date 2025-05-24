import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuthContext } from '@/contexts/Auth'
import {
  addProduct,
  getProducts,
  getProductsAmount,
  getTotalPrice,
  removeProduct,
} from '@/pizza_slices/Cart'
import { loadStripe } from '@stripe/stripe-js'
import { CreditCard, Minus, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from '../axios.js'
import { useReduxDispatch, useReduxSelector } from '../hooks/redux'
import '../styles/css/Cart.css'
import { Button } from './ui/button'

const AppCart = () => {
  const navigate = useNavigate()
  const { auth } = useAuthContext()

  const totalPrice = useReduxSelector(getTotalPrice)
  const productsAmount = useReduxSelector(getProductsAmount)
  const products = useReduxSelector(getProducts)
  const dispatch = useReduxDispatch()

  // useEffect(() => {
  //   // @ts-ignore
  //   console.log(process.env)
  // }, [])

  const makePayment = async () => {
    const stripe = await loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY!, {
      stripeAccount: process.env.VITE_STRIPE_ACCOUNT_ID,
    })

    if (!stripe) {
      console.log('Stripe is not loaded')
      return
    }

    const res = await axios.post('/api/orders/checkout', {
      products: products,
    })

    const answer = await stripe.redirectToCheckout({
      sessionId: res.data.answer.id,
    })

    if (answer.error) {
      console.log(answer.error)
    }
  }

  return (
    <>
      <div className="cart__subcontainer grid grid-cols-[repeat(2_,1fr)] grid-rows-[max-content] gap-[20px] w-[min(1000px,_100%)]">
        <div
          className={`flex flex-col gap-[10px] max-h-[500px] ${productsAmount > 1 && 'overflow-y-scroll'}`}
        >
          {products.map((product, i) => {
            return (
              <Card
                key={i}
                className="grid grid-cols-[repeat(2,_1fr)] grid-rows-[max-content] gap-[10px]"
              >
                <div className="flex flex-col gap-[10px]">
                  <CardHeader className="pr-[0px]">
                    <div className="flex justify-center items-center">
                      <img
                        src={product.image}
                        alt="CardHeader"
                        className="object-cover w-full"
                      />
                    </div>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {product.totalProductPriceCoded}{' '}
                    {product.quantity > 1 && `(x${product.quantity})`}
                  </CardContent>
                </div>
                <div>
                  <CardFooter className="flex flex-col items-start gap-[5px] pl-[0px]">
                    <span className="text-muted mb-[10px]">
                      {product.variant.color.charAt(0).toUpperCase() +
                        product.variant.color.slice(1)}{' '}
                      • M {product.variant.size.M} / W {product.variant.size.W}
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
          })}
        </div>

        <Card className="cart__checkout gap-[10px]">
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Make the payment</CardDescription>
          </CardHeader>
          <CardContent>~{totalPrice}</CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => {
                if (!auth) {
                  navigate('/login')
                  return
                }

                makePayment()
              }}
            >
              <CreditCard />
              Pay by card
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default AppCart

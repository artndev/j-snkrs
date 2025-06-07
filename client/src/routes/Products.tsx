import AppProductBack from '@/components/AppProductBack'
import { useEffect, useState } from 'react'
import axios from '../axios.js'
import '../styles/css/Products.css'

const Products = () => {
  const [products, setProducts] = useState<IProduct[] | undefined>(undefined)
  const [err, setErr] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get('/api/products')
      .then(res => setProducts(res.data.answer))
      .catch(err => {
        console.log(err)

        alert('Server is not responding')

        setErr(true)
      })
  }, [])

  return (
    <>
      {!products?.length || err ? (
        <div className="flex justify-center p-[20px]">Loading...</div>
      ) : (
        <div className="products__container grid grid-cols-[repeat(3,_1fr)] grid-rows-[max-content] gap-[20px] p-[20px]">
          {products.map((product, i) => {
            return (
              <AppProductBack
                key={i}
                id={product.Id}
                name={product.Name}
                price={product.Price}
                currency={product.Currency}
                description={product.Description}
                image={product.Image}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

export default Products

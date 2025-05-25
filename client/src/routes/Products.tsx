import AppProductBack from '@/components/AppProductBack'
import React, { useEffect, useState } from 'react'
import '../styles/css/Products.css'
import axios from '../axios'

const Products = () => {
  const [products, setProducts] = useState<IProduct[] | undefined>(undefined)
  const [err, setErr] = useState<IAxiosErrorResponse>(undefined)

  useEffect(() => {
    axios
      .get('/api/products')
      .then(res => setProducts(res.data.answer))
      .catch(err => {
        console.log(err)

        setErr(err.response)
      })
  }, [])

  return (
    <>
      {products ? (
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
      ) : (
        <div className="flex justify-center p-[20px]">Loading...</div>
      )}
    </>
  )
}

export default Products

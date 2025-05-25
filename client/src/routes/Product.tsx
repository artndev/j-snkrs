import AppProductFront from '@/components/AppProductFront'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../axios.js'

const Product = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<IProduct | undefined>(undefined)
  const [err, setErr] = useState<IAxiosErrorResponse>(undefined)

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then(res => setProduct(res.data.answer))
      .catch(err => {
        console.log(err)

        setErr(err.response)
      })
  }, [])

  return (
    <>
      {product ? (
        <div className="flex justify-center h-screen p-[20px]">
          <AppProductFront
            id={product.Id}
            name={product.Name}
            price={product.Price}
            currency={product.Currency}
            description={product.Description}
            details={product.Details}
            sizes={JSON.parse(product.Sizes)}
            image={product.Image}
          />
        </div>
      ) : (
        <div className="flex justify-center p-[20px]">Loading...</div>
      )}
    </>
  )
}

export default Product

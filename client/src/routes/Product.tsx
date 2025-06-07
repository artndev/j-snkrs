import AppProductFront from '@/components/AppProductFront'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../axios.js'

const Product = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<IProduct | undefined>(undefined)
  const [err, setErr] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then(res => setProduct(res.data.answer))
      .catch(err => {
        console.log(err)

        alert('Server is not responding')

        setErr(true)
      })
  }, [])

  return (
    <>
      {!product || err ? (
        <div className="flex justify-center p-[20px]">Loading...</div>
      ) : (
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
      )}
    </>
  )
}

export default Product

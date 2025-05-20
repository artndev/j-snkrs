import AppProductBack from '@/components/AppProductBack'
import React from 'react'
import '../styles/css/Products.css'

const Products = () => {
  return (
    <div className="products__container">
      <AppProductBack
        id={1}
        name="Nike SB Dunk Low Pro"
        price={115}
        currency={'usd'}
        description="Skate Shoes"
        image="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b16d8611-3cc7-4934-934d-10074bc7aa4c/NIKE+SB+DUNK+LOW+PRO.png"
      />
      <AppProductBack
        id={1}
        name="Nike SB Dunk Low Pro"
        price={115}
        currency={'usd'}
        description="Skate Shoes"
        image="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b16d8611-3cc7-4934-934d-10074bc7aa4c/NIKE+SB+DUNK+LOW+PRO.png"
      />
    </div>
  )
}

export default Products

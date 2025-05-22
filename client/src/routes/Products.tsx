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
        id={2}
        name="Air Force 1 Low Retro"
        price={150}
        currency={'usd'}
        description="White and Baroque Brown"
        image="https://static.nike.com/a/images/w_1280,q_auto,f_auto/444f1053-ee7f-4009-badc-58a8a847caba/air-force-1-low-retro-white-and-baroque-brown-hj4323-100-release-date.jpg"
      />
      <AppProductBack
        id={3}
        name='LeBron XXI "Prime 96"'
        price={200}
        currency={'usd'}
        description="White and Fire Red"
        image="https://static.nike.com/a/images/w_1280,q_auto,f_auto/e1917425-354d-4033-af56-c28ccb50301d/lebron-xxi-prime-96.jpg"
      />
    </div>
  )
}

export default Products

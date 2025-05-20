import AppProductFront from '@/components/AppProductFront'
import React from 'react'

const Product = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full p-[20px]">
      <AppProductFront
        id={1}
        name="Nike SB Dunk Low Pro"
        price={115}
        currency={'usd'}
        description="Skate Shoes"
        details="You can always count on a classic. The Nike SB Dunk Low pairs iconic color blocking with premium materials and plush padding for game-changing comfort that lasts. The possibilities are endless — how will you wear your Dunks?"
        sizes={JSON.parse(
          '{"green": [{"M":"4","W":"5.5"},{"M":"4","W":"5.5"},{"M":"4","W":"5.5"}], "yellow": [{"M":"4","W":"5.5"},{"M":"4","W":"5.5"},{"M":"4","W":"5.5"}], "blue": [{"M":"4","W":"5.5"},{"M":"4","W":"5.5"},{"M":"4","W":"5.5"}], "red": [{"M":"4","W":"5.5"},{"M":"4","W":"5.5"},{"M":"4","W":"5.5"}]}'
        )}
        image="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b16d8611-3cc7-4934-934d-10074bc7aa4c/NIKE+SB+DUNK+LOW+PRO.png"
      />
    </div>
  )
}

export default Product

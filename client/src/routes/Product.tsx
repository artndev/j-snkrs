import AppProductFront from '@/components/AppProductFront'
import React from 'react'

const Product = () => {
  return (
    <div className="flex justify-center h-screen p-[20px]">
      {/* <AppProductFront
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
      /> */}
      {/* <AppProductFront
        id={2}
        name="Air Force 1 Low Retro"
        price={150}
        currency={'usd'}
        description="White and Baroque Brown"
        details="A quiet legend from 2002, the Air Force 1 'Escape' returns for the first time. Wrapped in rich materials, this luxe edition features full-grain leather, signature color blocking and a warm color palette that mixes a crisp white upper with Medium Brown and Baroque Brown accents. The Sport Red tongue logo and Nike Air cushioning keep it true to the original. It feels good to step into a classic—and lacing up the 'Escape' feels even better."
        sizes={JSON.parse(
          '{"green": [{"M":"4","W":"5.5"},{"M":"4","W":"5.5"},{"M":"4","W":"5.5"}], "yellow": [{"M":"4","W":"5.5"},{"M":"4","W":"5.5"},{"M":"4","W":"5.5"}], "blue": [{"M":"4","W":"5.5"},{"M":"4","W":"5.5"},{"M":"4","W":"5.5"}], "red": [{"M":"4","W":"5.5"},{"M":"4","W":"5.5"},{"M":"4","W":"5.5"}]}'
        )}
        image="https://static.nike.com/a/images/w_1280,q_auto,f_auto/444f1053-ee7f-4009-badc-58a8a847caba/air-force-1-low-retro-white-and-baroque-brown-hj4323-100-release-date.jpg"
      /> */}
      <AppProductFront
        id={3}
        name='LeBron XXI "Prime 96"'
        price={200}
        currency={'usd'}
        description="White and Fire Red"
        details="Deion's legendary swagger inspired a young LeBron to strive for his own greatness. So as the King celebrates his 21st season, it’s only right the legends link up in this Prime Time design. Inspired by the Nike Air Diamond Turf ’96, this LeBron 21 combines the iconic midfoot strap and claw marks that Deion wore during his heyday with court-ready Air Zoom cushioning. The iconic colorway blends white, black, Fire Red and Metallic Gold as a tribute to Deion's legacy."
        sizes={JSON.parse(
          '{"green": [{"M":"4","W":"5.5"},{"M":"4","W":"5.5"},{"M":"4","W":"5.5"}], "yellow": [{"M":"4","W":"5.5"},{"M":"4","W":"5.5"},{"M":"4","W":"5.5"}], "blue": [{"M":"4","W":"5.5"},{"M":"4","W":"5.5"},{"M":"4","W":"5.5"}], "red": [{"M":"4","W":"5.5"},{"M":"4","W":"5.5"},{"M":"4","W":"5.5"}]}'
        )}
        image="https://static.nike.com/a/images/w_1280,q_auto,f_auto/e1917425-354d-4033-af56-c28ccb50301d/lebron-xxi-prime-96.jpg"
      />
    </div>
  )
}

export default Product

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from 'react-router-dom'
import config from '../config.json'

const AppProductBack: React.FC<IProductBackProps> = ({
  id,
  name,
  price,
  currency,
  description,
  image,
}) => {
  return (
    <Card className="gap-[10px]">
      <CardHeader>
        <Link to={`/products/${id}`}>
          <img src={image} alt="CardHeader" className="object-cover" />
        </Link>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{price + config.currencyCodes[currency]}</CardContent>
    </Card>
  )
}

export default AppProductBack

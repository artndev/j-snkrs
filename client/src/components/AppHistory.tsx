import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import React from 'react'
import { Link } from 'react-router-dom'

const AppHistory: React.FC<IHistoryProps> = ({ history }) => {
  return (
    <div className="flex flex-col gap-[10px] w-[min(1000px,_100%)]">
      <div className="flex flex-col gap-[5px]">
        <h3 className="leading-none font-semibold">History</h3>
        <span className="text-muted">The history of your transactions</span>
      </div>
      <div className="flex flex-col gap-[5px] max-h-[500px] overflow-y-auto">
        {history.map((check, i) => {
          return (
            <Card key={i} className="gap-[10px] w-full">
              <CardHeader>
                <CardTitle>Check — {check.TotalPrice}</CardTitle>
                <CardDescription>{check.ReferenceId}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-[5px]">
                {JSON.parse(check.LineItems).map(
                  (item: ILineItem, i: number) => {
                    return (
                      <Link
                        key={i}
                        to={`/products/${item.price_data.product_data.metadata.id}`}
                        className="flex items-center w-full hover:underline"
                      >
                        {item.price_data.product_data.name}{' '}
                        {item.quantity > 1 && `(x${item.quantity})`}
                      </Link>
                    )
                  }
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default AppHistory

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const AppHistory: React.FC<IHistoryProps> = ({ history }) => {
  return (
    <div
      className={`flex flex-col gap-[20px] w-[min(1000px,_100%)] max-h-[500px] overflow-y-scroll`}
    >
      {history.map((check, i) => {
        return (
          <Card key={i} className="gap-[10px] w-full">
            <CardHeader>
              <CardTitle>Check #{i + 1}</CardTitle>
              <CardDescription>{check.Id}</CardDescription>
            </CardHeader>
          </Card>
        )
      })}
    </div>
  )
}

export default AppHistory

import AppHistory from '@/components/AppHistory'
import React, { useEffect, useState } from 'react'
import axios from '../axios.js'

const History = () => {
  const [history, setHistory] = useState<ICheck[] | undefined>(undefined)

  useEffect(() => {
    try {
      axios
        .get('/api/orders')
        .then(res => setHistory(res.data.answer))
        .catch(err => console.log(err))
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <div className="flex justify-center h-screen p-[20px]">
      {history ? <AppHistory history={history} /> : 'Loading...'}
    </div>
  )
}

export default History

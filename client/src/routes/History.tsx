import AppHistory from '@/components/AppHistory'
import { useEffect, useState } from 'react'
import axios from '../axios.js'

const History = () => {
  const [history, setHistory] = useState<ICheck[] | undefined>(undefined)
  const [err, setErr] = useState<boolean>(false)

  useEffect(() => {
    try {
      axios
        .get('/api/orders')
        .then(res => setHistory(res.data.answer))
        .catch(err => console.log(err))
    } catch (err) {
      console.log(err)

      alert('Server is not responding')

      setErr(true)
    }
  }, [])

  return (
    <>
      {!history?.length || err ? (
        <div className="flex justify-center p-[20px]">
          Here is nothing yet...
        </div>
      ) : (
        <div className="flex justify-center h-screen p-[20px]">
          <AppHistory history={history} />
        </div>
      )}
    </>
  )
}

export default History

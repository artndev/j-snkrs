import AppAccount from '@/components/AppAccount'
import { useAuthContext } from '@/contexts/Auth'
import { useEffect, useState } from 'react'
import axios from '../axios.js'

const Account = () => {
  const { auth } = useAuthContext()
  const [saves, setSaves] = useState<IProduct[] | undefined>(undefined)

  useEffect(() => {
    try {
      axios
        .get('/api/saves')
        .then(res => setSaves(res.data.answer))
        .catch(err => console.log(err))
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <div className="flex justify-center h-screen p-[20px]">
      <AppAccount
        id={auth?.Id}
        username={auth?.Username}
        email={auth?.Email}
        googleId={auth?.GoogleId}
        githubId={auth?.GithubId}
        verified={auth?.Verified}
        saves={saves}
      />
    </div>
  )
}

export default Account

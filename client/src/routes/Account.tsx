import AppAccount from '@/components/AppAccount'
import { useAuthContext } from '@/contexts/Auth'
import React from 'react'

const Account = () => {
  const { auth } = useAuthContext()

  return (
    <div className="flex justify-center h-screen p-[20px]">
      <AppAccount
        id={auth?.Id}
        username={auth?.Username}
        email={auth?.Email}
        googleId={auth?.GoogleId}
        githubId={auth?.GithubId}
      />
    </div>
  )
}

export default Account

import AppAdmin from '@/components/AppAdmin'
import AppAuthForm from '@/components/AppAuthForm'
import { useState } from 'react'
import axios from '../axios.js'

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [err, setErr] = useState<boolean>(false)

  const onSubmit = async (data: IAuthFormData) => {
    try {
      await axios
        .post('/api/auth/admin', data)
        .then(() => setIsAdmin(true))
        .catch(err => {
          console.log(err)

          setErr(true)
        })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {isAdmin ? (
        <AppAdmin />
      ) : (
        <div className="flex flex-col justify-center items-center gap-[10px] h-[100%] p-[20px] select-none">
          <AppAuthForm
            formTitle="Log in (admin)"
            onSubmit={onSubmit}
            err={err}
          />
        </div>
      )}
    </>
  )
}

export default Admin

import AppAuthForm from '@/components/AppAuthForm'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../axios.js'
import { useAuthContext } from '../contexts/Auth'

const LoginForm = () => {
  const { setAuth } = useAuthContext()
  const navigator = useNavigate()
  const [err, setErr] = useState<boolean>(false)

  const onSubmit = (data: IAuthFormData) => {
    try {
      axios
        .post('/api/local/login', data)
        .then(res => {
          setAuth(res.data.answer)
        })
        .then(() => {
          navigator('/account')
          navigator(0)
        })
        .catch(err => {
          console.log(err)

          setErr(true)
        })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-[10px] w-full h-screen p-[20px] select-none">
      <AppAuthForm
        formTitle="Log in"
        onSubmit={onSubmit}
        err={err}
        withSocials
      />
      <Link
        className="text-muted-foreground text-sm hover:underline"
        to={'/register'}
      >
        I want to register
      </Link>
    </div>
  )
}

export default LoginForm

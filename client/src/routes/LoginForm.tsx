import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../axios'
import { useAuthContext } from '../contexts/Auth'
import AppAuthForm from '@/components/AppAuthForm'

const LoginForm = () => {
  const { setAuth } = useAuthContext()
  const navigator = useNavigate()
  const [err, setErr] = useState<IAxiosErrorResponse>(undefined)

  const onSubmit = (data: IAuthFormData) => {
    try {
      axios
        .post('/api/local/login', data)
        .then(res => {
          setAuth(res.data.answer)
        })
        .then(() => {
          navigator('/')
          navigator(0)
        })
        .catch(err => {
          console.log(err)

          setErr(err.response)
        })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-[10px] h-[100%] p-[20px] select-none">
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

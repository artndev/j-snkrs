import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../axios'
import { useAuthContext } from '../contexts/Auth'
import '../styles/css/AuthForm.css'
import AppAuthForm from '@/components/AppAuthForm'

const RegisterForm = () => {
  const { setAuth } = useAuthContext()
  const navigator = useNavigate()
  const [err, setErr] = useState<IAxiosErrorResponse>(undefined)

  const onSubmit = (data: IAuthFormData) => {
    try {
      axios
        .post('/api/local/register', data)
        .then(res => {
          setAuth(res.data.answer)
        })
        .then(() => {
          navigator('/account')
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
        formTitle="Register"
        onSubmit={onSubmit}
        err={err}
        withEmail
      />
      <Link
        className="text-muted-foreground text-sm hover:underline"
        to={'/login'}
      >
        I want to log in
      </Link>
    </div>
  )
}

export default RegisterForm

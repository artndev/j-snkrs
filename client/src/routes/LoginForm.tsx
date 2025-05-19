import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
import AuthForm from '../components/AuthForm'
import { useAuthContext } from '../contexts/Auth'
import '../styles/css/LoginForm.css'
import AppAuthForm from '@/components/AppAuthForm'

const LoginForm = () => {
  const { setAuth } = useAuthContext()
  const navigator = useNavigate()
  const [err, setErr] = useState<IAxiosErrorResponse>(undefined)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      let data: Record<string, FormDataEntryValue> = {}
      formData.forEach((val, key) => (data[key] = val))

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
    <div className="login__form-container">
      <AppAuthForm
        formTitle="Log in"
        onSubmit={onSubmit}
        err={err}
        withSocials
      />
      {/* <AuthForm
          formTitle="Log in"
          onSubmit={onSubmit}
          err={err}
          withSocials
        /> */}
    </div>
  )
}

export default LoginForm

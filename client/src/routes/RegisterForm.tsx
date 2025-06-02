import AppAuthForm from '@/components/AppAuthForm.js'
import { Button } from '@/components/ui/button.js'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RotateCw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../axios.js'
import config from '../config.json'
import '../styles/css/AuthForm.css'

function secondsToTime(secs: number) {
  const divisor_for_minutes = secs % (60 * 60)
  const minutes = Math.floor(divisor_for_minutes / 60)

  const divisor_for_seconds = divisor_for_minutes % 60
  const seconds = Math.ceil(divisor_for_seconds)

  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

const RegisterForm = () => {
  const [err, setErr] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const [timerValue, setTimerValue] = useState<number>(0)
  const timerInstance = useRef<NodeJS.Timeout | undefined>(undefined)
  const timerCached = useRef<number>(0)
  const timerInitialized = useRef<boolean>(true)
  const data = useRef<IAuthFormData | undefined>(undefined)

  const startTimer = async () => {
    if (timerInitialized.current) return

    timerInitialized.current = true
    timerCached.current = config.timerLimit
    setTimerValue(timerCached.current)

    timerInstance.current = setInterval(() => {
      if (timerCached.current <= 0) {
        clearInterval(timerInstance.current)
        return
      }

      timerCached.current -= 1
      setTimerValue(timerCached.current)
    }, 1000)
  }

  const onSubmit = (data: IAuthFormData) => {
    try {
      axios
        .post('/api/local/register', {
          destination: JSON.stringify(data),
        })
        .then(() => {
          if (timerInstance.current) clearInterval(timerInstance.current)

          timerInitialized.current = false
          startTimer()
          setModal(true)
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
    <div className="flex flex-col justify-center items-center gap-[10px] h-[100%] p-[20px] select-none">
      {modal && data.current ? (
        <div className="flex flex-col gap-[10px] w-[min(350px,_100%)]">
          <Card className="gap-[10px] w-[min(350px,_100%)]">
            <CardHeader>
              <CardTitle>Thanks for joining!</CardTitle>
              <CardDescription>
                Your account has not been activated yet
              </CardDescription>
            </CardHeader>
            <CardContent>
              You have just registered but you need to verify your email. Check
              the email box for the confirm link sent by @ArtBot...
            </CardContent>
            <CardFooter className="flex-col items-start gap-[10px]">
              {timerValue > 0 && (
                <span>Debounce — {secondsToTime(timerValue)}</span>
              )}
            </CardFooter>
          </Card>
          <Button
            className="w-full"
            onClick={() => {
              onSubmit(data.current!)

              if (timerInstance.current) clearInterval(timerInstance.current)

              timerInitialized.current = false
              startTimer()
            }}
            disabled={timerValue ? true : false}
          >
            <RotateCw />
            <span>Resend</span>
          </Button>
        </div>
      ) : (
        <>
          <AppAuthForm
            formTitle="Register"
            onSubmit={val => {
              data.current = val
              onSubmit(data.current!)
            }}
            err={err}
            withEmail
          />
          <Link
            className="text-muted-foreground text-sm hover:underline"
            to={'/login'}
          >
            I want to log in
          </Link>
        </>
      )}
    </div>
  )
}

export default RegisterForm

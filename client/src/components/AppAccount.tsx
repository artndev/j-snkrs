import { Button } from '@/components/ui/button.js'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAuthContext } from '@/contexts/Auth'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DialogClose } from '@radix-ui/react-dialog'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../axios.js'
import config from '../config.json'
import { AppAuthFormDialogs } from './AppAuthForm.js'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.js'

const AppAccount: React.FC<IAccountProps> = ({
  id,
  username,
  email,
  googleId,
  githubId,
  verified,
  saves,
}) => {
  const navigator = useNavigate()
  const form = useForm()
  const { auth, setAuth } = useAuthContext()

  const unattachGoogleId = async () => {
    try {
      await axios
        .post('/api/google/unattach')
        .then(res => setAuth(res.data.answer))
        .catch(err => {
          console.log(err)

          alert(err.response.data.message)
        })
    } catch (err) {
      console.log(err)

      alert('Server is not responding')
    }
  }

  const unattachGithubId = async () => {
    try {
      await axios
        .post('/api/github/unattach')
        .then(res => setAuth(res.data.answer))
        .catch(err => {
          console.log(err)

          alert(err.response.data.message)
        })
    } catch (err) {
      console.log(err)

      alert('Server is not responding')
    }
  }

  const deleteCurrent = async () => {
    try {
      await axios
        .delete('/api/auth/delete')
        .then(() => {
          setAuth(undefined)
          navigator(0)
        })
        .catch(err => {
          console.log(err)

          alert(err.response.data.message)
        })
    } catch (err) {
      console.log(err)

      alert('Server is not responding')
    }
  }

  const updateCurrent = async (data: IAuthFormData) => {
    try {
      data = { ...data, id: auth!.Id }

      const res = await axios
        .put(`/api/auth/update${data?.confirmOtp ? `?withOtp=true` : ''}`, data)
        .then(res => {
          window.location.href = window.location.href

          return res
        }) // href is clearing cache of modals
        .catch(err => {
          console.log(err)

          return err
        })

      const message = res.data?.message ?? res?.response.data.message
      return {
        message: message ?? 'Message has not been provided',
        answer: res.data?.answer,
      }
    } catch (err) {
      console.log(err)

      return {
        message: 'Server is not responding',
        answer: null,
      }
    }
  }

  const sendOTP = async (data: IAuthFormData) => {
    try {
      const res = await axios
        .post(
          '/api/auth/otp',
          JSON.stringify({ email: data?.email ?? auth!.Email })
        )
        .catch(err => {
          console.log(err)

          return err
        })

      const message = res.data?.message ?? res?.response.data.message
      return {
        message: message ?? 'Message has not been provided',
        answer: res.data?.answer
          ? {
              confirmOtp: res.data?.answer.otp,
            }
          : null,
      }
    } catch (err) {
      console.log(err)

      return {
        message: 'Server is not responding',
        answer: null,
      }
    }
  }

  const fakeSubmit = () => {
    return {
      answer: true,
    }
  }

  return (
    <div className="flex flex-col gap-[20px] w-full max-w-[min(1000px,_100%)]">
      <Card className="gap-[20px] break-all">
        <CardHeader>
          <CardTitle>Account Info</CardTitle>
          <CardDescription>The description of your personality</CardDescription>
        </CardHeader>
        <CardContent className="gap-[10px]">
          <ul className="flex flex-col gap-[10px]">
            <li className="flex items-center gap-[10px]">
              {auth && (
                <AppAuthFormDialogs
                  modalProps={{
                    onSubmit: fakeSubmit,
                    formTitle: 'Edit profile',
                    formDescription:
                      'Make changes to your profile here. Click the submit button when you are done',
                    trigger: (
                      <Button size={'icon'}>
                        <Pencil />
                      </Button>
                    ),
                    inputs: [
                      {
                        name: 'username',
                        label: 'Username',
                        description: (
                          <span>
                            Cannot be started with a digit. Must contain 5 to 20
                            characters without spaces: <em>a-z/0-9/_</em>
                          </span>
                        ),
                        defaultValue: auth!.Username,
                      },
                    ],
                    dirtyValues: {
                      username: auth!.Username,
                    },
                  }}
                  submodalProps={{
                    onSubmit: updateCurrent,
                    formTitle: 'Confirm changes',
                    formDescription:
                      'Write your current password to identify yourself',
                    inputs: [
                      {
                        type: 'password',
                        name: 'confirmPassword',
                        label: 'Password',
                      },
                    ],
                  }}
                />
              )}
              <span>
                Username: <strong>{username ?? 'guest'}</strong>
              </span>
            </li>
            <li className="flex items-center gap-[10px]">
              {auth && (
                <AppAuthFormDialogs
                  modalProps={{
                    onSubmit: sendOTP,
                    formTitle: 'Edit profile',
                    formDescription:
                      'Make changes to your profile here. Click the submit button when you are done',
                    trigger: (
                      <Button size={'icon'}>
                        <Pencil />
                      </Button>
                    ),
                    inputs: [
                      {
                        type: 'password',
                        name: 'password',
                        label: 'Password',
                        description: (
                          <span>
                            Must contain 5 to 20 characters without spaces:{' '}
                            <em>
                              'a-z', 'A-Z', '0-9' and './_/!/@/#/$/%/^/&/*'
                            </em>
                          </span>
                        ),
                      },
                    ],
                  }}
                  submodalProps={{
                    onSubmit: updateCurrent,
                    formTitle: 'Confirm changes',
                    formDescription:
                      'In few seconds you will receive the confirmation code. Do not forget to check your email box, and afterwards click the submit button',
                    inputs: [
                      {
                        type: 'otp',
                        name: 'otp',
                        label: 'Code',
                      },
                    ],
                  }}
                />
              )}
              <span>
                Password: <strong>***</strong>
              </span>
            </li>
            <li className="flex items-center gap-[10px]">
              {auth && (
                <AppAuthFormDialogs
                  modalProps={{
                    onSubmit: sendOTP,
                    formTitle: 'Edit profile',
                    formDescription:
                      'Make changes to your profile here. Click the submit button when you are done',
                    trigger: (
                      <Button size={'icon'}>
                        <Pencil />
                      </Button>
                    ),
                    inputs: [
                      {
                        type: 'email',
                        name: 'email',
                        label: 'Email',
                        defaultValue: auth!.Email,
                      },
                    ],
                    dirtyValues: {
                      email: auth!.Email,
                    },
                  }}
                  submodalProps={{
                    onSubmit: updateCurrent,
                    formTitle: 'Verify email',
                    formDescription: `In few seconds you will receive the verification code. Do not forget to check your email box, and afterwards click the submit button`,
                    inputs: [
                      {
                        type: 'otp',
                        name: 'otp',
                        label: 'Code',
                        pattern: /^\d+$/,
                      },
                    ],
                  }}
                />
              )}
              <span>
                Email: <strong>{email ?? 'unknown'}</strong>
              </span>
              {verified && <span className="text-green-500">(v)</span>}
            </li>
          </ul>
        </CardContent>
        {auth && (
          <CardFooter className="gap-[5px]">
            <Dialog>
              <DialogTrigger>
                <Button variant={'destructive'}>
                  <Trash2 />
                  <span>Delete my account</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from the server
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(deleteCurrent)}>
                    <DialogFooter className="mt-[10px]">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                      >
                        I am sure
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </CardFooter>
        )}
      </Card>
      <Card className="gap-[10px] break-all">
        <CardHeader>
          <CardTitle>Socials</CardTitle>
          <CardDescription>
            The great variety of you in different ways
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-[10px]">
          <ul>
            <li className="flex items-center gap-[10px]">
              <FontAwesomeIcon icon={faGoogle} />
              <div className="flex items-center gap-[5px]">
                <a
                  className="text-muted-foreground hover:underline"
                  href={
                    id
                      ? `${config.SERVER_URL}/api/google/login?id=${id}`
                      : '/login'
                  }
                >
                  {googleId ? (
                    <span>
                      Google-ID: <strong>{googleId}</strong>
                    </span>
                  ) : (
                    <span>Attach Google-ID</span>
                  )}
                </a>
                {googleId && (
                  <button onClick={unattachGoogleId}>
                    <Plus className="rotate-[45deg]" />
                  </button>
                )}
              </div>
            </li>
            <li className="flex items-center gap-[10px]">
              <FontAwesomeIcon icon={faGithub} />
              <div className="flex items-center gap-[5px]">
                <a
                  className="text-muted-foreground hover:underline"
                  href={
                    id
                      ? `${config.SERVER_URL}/api/github/login?id=${id}`
                      : '/login'
                  }
                >
                  {githubId ? (
                    <span>
                      Github-ID: <strong>{githubId}</strong>
                    </span>
                  ) : (
                    <span>Attach Github-ID</span>
                  )}
                </a>
                {githubId && (
                  <button onClick={unattachGithubId}>
                    <Plus className="rotate-[45deg]" />
                  </button>
                )}
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="gap-[10px] break-all">
        <CardHeader>
          <CardTitle>Saves</CardTitle>
          <CardDescription>The list of your SNKRS besties</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-[repeat(3,_1fr)] gap-[10px]">
          {!saves?.length ? (
            <span>Here is nothing yet...</span>
          ) : (
            saves.map((save, i) => {
              return (
                <Link
                  key={i}
                  to={`/products/${save.Id}`}
                  className="overflow-hidden"
                >
                  <img
                    src={save.Image}
                    alt="SaveCover"
                    className="object-cover w-full rounded-xl"
                  />
                </Link>
              )
            })
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AppAccount

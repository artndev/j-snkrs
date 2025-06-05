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
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../axios.js'
import config from '../config.json'
import { AppAuthFormDialogs } from './AppAuthForm.js'

const AppAccount: React.FC<IAccountProps> = ({
  id,
  username,
  email,
  googleId,
  githubId,
  verified,
  saves,
}) => {
  const { auth, setAuth } = useAuthContext()

  const unattachGoogleId = () => {
    try {
      axios
        .post('/api/google/unattach')
        .then(res => setAuth(res.data.answer))
        .catch(err => console.log(err))
    } catch (err) {
      console.log(err)
    }
  }

  const unattachGithubId = () => {
    try {
      axios
        .post('/api/github/unattach')
        .then(res => setAuth(res.data.answer))
        .catch(err => console.log(err))
    } catch (err) {
      console.log(err)
    }
  }

  const updateCurrent = (data: IAuthFormData) => {
    try {
      const { otpOriginal, ...dataPayload } = data

      axios
        .put(`/api/auth/update?otp=${otpOriginal}`, dataPayload)
        .then(() => (window.location.href = window.location.href)) // href is clearing cache of modals
        .catch(err => console.log(err))
    } catch (err) {
      console.log(err)
    }
  }

  const sendOTP = async (data: IAuthFormData) => {
    try {
      const res = await axios
        .post('/api/auth/otp', JSON.stringify(data))
        .then(res => res.data.answer)
        .catch(err => console.log(err))

      return {
        otpOriginal: res,
      }
    } catch (err) {
      console.log(err)
    }
  }

  // useEffect(() => {
  //   console.log(opened)
  // }, [opened])

  return (
    <div className="flex flex-col gap-[20px] w-[min(1000px,_100%)]">
      <Card className="gap-[20px]">
        <CardHeader>
          <CardTitle>Account Info</CardTitle>
          <CardDescription>The description of your personality</CardDescription>
        </CardHeader>
        <CardContent className="gap-[10px]">
          <ul className="flex flex-col gap-[10px]">
            <li className="flex items-center gap-[10px]">
              {/* <AppAuthFormDialog
                formTitle="Edit profile"
                formDescription="Make changes to your profile here. Click submit when you are done"
                err={false}
                onSubmit={updateCurrent}
                trigger={
                  <Button size={'icon'}>
                    <Pencil />
                  </Button>
                }
                inputs={[
                  {
                    name: 'username',
                    label: 'Username',
                    description: (
                      <span>
                        Cannot be started with a digit. Must contain 5 to 20
                        characters without spaces: <em>a-z/0-9/_</em>
                      </span>
                    ),
                    pattern: '^(?=.*[a-z])(?=[a-z_]+[a-z0-9_])[a-z0-9_]{5,20}$',
                    defaultValue: auth?.Username,
                  },
                ]}
              /> */}
              <span>
                Username: <strong>{username ?? 'guest'}</strong>
              </span>
            </li>
            <li className="flex items-center gap-[10px]">
              <AppAuthFormDialogs
                modalProps={{
                  onSubmit: sendOTP,
                  formTitle: 'Edit profile',
                  formDescription:
                    'Make changes to your profile here. Click submit when you are done',
                  err: false,
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
                      defaultValue: auth?.Email,
                    },
                  ],
                }}
                submodalProps={{
                  onSubmit: updateCurrent,
                  formTitle: 'Verify the new email',
                  formDescription:
                    'In few seconds you will receive the email with the confirmation link. Check your email box and click submit when you are done',
                  err: false,
                  inputs: [
                    {
                      isOTP: true,
                      name: 'otp',
                      label: 'Code',
                      pattern: /^\d+$/,
                    },
                  ],
                }}
              />
              <span>
                Email: <strong>{email ?? 'unknown'}</strong>
              </span>{' '}
              {!verified ? (
                <span className="italic text-(--destructive)">
                  (not verified)
                </span>
              ) : (
                <span className="italic text-green-500">(verified)</span>
              )}
            </li>
          </ul>
        </CardContent>
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
                <DialogFooter className="mt-[10px]">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">I am sure</Button>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
      <Card className="gap-[10px]">
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
      <Card className="gap-[10px]">
        <CardHeader>
          <CardTitle>Saves</CardTitle>
          <CardDescription>The list of your SNKRS besties</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-[repeat(3,_1fr)] gap-[10px]">
          {!saves?.length ? (
            <span>Loading...</span>
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

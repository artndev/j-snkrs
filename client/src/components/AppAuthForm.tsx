import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import config from '../config.json'

const AppAuthForm: React.FC<IAuthFormProps> = ({
  formTitle,
  onSubmit,
  err,
  withEmail,
  withSocials,
}) => {
  const form = useForm()
  const [inputType, setInputType] = useState('password')

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[20px] max-w-[300px] w-[100%]"
      >
        <span className="text-xl font-bold mb-[10px]">{formTitle}</span>
        {err && (
          <span className="italic text-red-500">
            This username has already been taken or your credentials are
            incorrect
          </span>
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-[100%]">
              <FormLabel>Username</FormLabel>
              <FormDescription>
                Cannot be started with a digit. Must contain 5 to 20 characters
                without spaces: <em>a-z/0-9/_</em>
              </FormDescription>
              <FormControl>
                <Input
                  //pattern="^(?=.*[a-z])(?=[a-z_]+[a-z0-9_])[a-z0-9_]{5,20}$"
                  placeholder="Enter your username.."
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-[100%]">
              <FormLabel>Password</FormLabel>
              <FormDescription>
                Must contain 5 to 20 characters without spaces:{' '}
                <em>'a-z', 'A-Z', '0-9' and './_/!/@/#/$/%/^/&/*'</em>
              </FormDescription>
              <div className="relative">
                <FormControl>
                  <Input
                    type={inputType}
                    //pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_.!@#$%^&*])[a-zA-Z0-9_.!@#$%^&*]{5,20}$"
                    placeholder="Enter your password.."
                    required
                    {...field}
                  />
                </FormControl>
                <button
                  className="password__input-btn closed"
                  type="button"
                  onClick={e => {
                    const target = e.target as HTMLButtonElement

                    if (target.classList.contains('closed')) {
                      target.classList.remove('closed')
                      target.classList.add('opened')
                      setInputType('text')
                      return
                    }

                    target.classList.remove('opened')
                    target.classList.add('closed')
                    setInputType('password')
                  }}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {withEmail && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-[100%]">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email.."
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {withSocials && (
          <>
            <span className="self-center">Or</span>
            <div className="flex items-center gap-[10px]">
              <a
                className="flex-1"
                href={`${config.SERVER_URL}/api/google/login`}
              >
                <Button className="w-[100%]" type="button" variant={'outline'}>
                  <FontAwesomeIcon icon={faGoogle} />
                  Google
                </Button>
              </a>
              /
              <a
                className="flex-1"
                href={`${config.SERVER_URL}/api/github/login`}
              >
                <Button className="w-[100%]" type="button" variant={'outline'}>
                  <FontAwesomeIcon icon={faGithub} />
                  Github
                </Button>
              </a>
            </div>
          </>
        )}
        <Button className="w-full self-center mt-[10px]" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default AppAuthForm

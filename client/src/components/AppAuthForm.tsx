import React, { useState } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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
              <FormDescription>Validation info</FormDescription>
              <FormControl>
                <Input placeholder="Enter your username.." {...field} />
              </FormControl>
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
                <FormDescription>Validation info</FormDescription>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email.."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-[100%]">
              <FormLabel>Password</FormLabel>
              <FormDescription>Validation info</FormDescription>
              <div className="relative">
                <FormControl>
                  <Input
                    type={inputType}
                    placeholder="Enter your password.."
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
        <Button className="w-[50%] self-center mt-[10px]" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default AppAuthForm

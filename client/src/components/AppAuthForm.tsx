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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

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
        className="flex flex-col gap-[10px] w-[min(350px,_100%)]"
      >
        <span className="leading-none text-xl font-bold mb-[10px]">
          {formTitle}
        </span>
        {err && (
          <span className="italic text-(--destructive)">
            This username has already been taken or your credentials are
            incorrect
          </span>
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormDescription>
                Cannot be started with a digit. Must contain 5 to 20 characters
                without spaces: <em>a-z/0-9/_</em>
              </FormDescription>
              <FormControl>
                <Input
                  pattern="^(?=.*[a-z])(?=[a-z_]+[a-z0-9_])[a-z0-9_]{5,20}$"
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
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormDescription>
                Must contain 5 to 20 characters without spaces:{' '}
                <em>'a-z', 'A-Z', '0-9' and './_/!/@/#/$/%/^/&/*'</em>
              </FormDescription>
              <div className="relative">
                <FormControl>
                  <Input
                    type={inputType}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_.!@#$%^&*])[a-zA-Z0-9_.!@#$%^&*]{5,20}$"
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
              <FormItem>
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
            <div className="flex items-center gap-[5px]">
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
        <Button className="w-full mt-[10px]" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}

// ? Here! Found out some solutions
// Edit password / email / username separate dialog-forms
export const AppAuthFormDialog: React.FC<IAuthFormDialogProps> = ({
  formTitle,
  formDescription,
  onSubmit,
  err,
  trigger,
  defaultUsername,
  defaultPassword,
  defaultEmail,
  withEmail,
}) => {
  const form = useForm()
  const [inputType, setInputType] = useState('password')

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{formTitle}</DialogTitle>
          <DialogDescription>{formDescription}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-[10px]"
          >
            {err && (
              <span className="italic text-(--destructive)">
                This username has already been taken or your credentials are
                incorrect
              </span>
            )}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormDescription>
                    Cannot be started with a digit. Must contain 5 to 20
                    characters without spaces: <em>a-z/0-9/_</em>
                  </FormDescription>
                  <FormControl>
                    <Input
                      pattern="^(?=.*[a-z])(?=[a-z_]+[a-z0-9_])[a-z0-9_]{5,20}$"
                      placeholder="Enter your username.."
                      defaultValue={defaultUsername ?? ''}
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
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormDescription>
                    Must contain 5 to 20 characters without spaces:{' '}
                    <em>'a-z', 'A-Z', '0-9' and './_/!/@/#/$/%/^/&/*'</em>
                  </FormDescription>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={inputType}
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_.!@#$%^&*])[a-zA-Z0-9_.!@#$%^&*]{5,20}$"
                        placeholder="Enter your password.."
                        defaultValue={defaultPassword ?? ''}
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
            {withEmail && defaultEmail && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email.."
                        defaultValue={defaultEmail}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter className="mt-[10px]">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AppAuthForm

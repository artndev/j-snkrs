import { Button } from '@/components/ui/button'
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import config from '../config.json'
import regexes from '../regexes.js'

const AppAuthForm: React.FC<IAuthFormProps> = ({
  formTitle,
  onSubmit,
  err,
  errDescription,
  withEmail,
  withSocials,
}) => {
  const formSchema = z.object({
    username: z
      .string()
      .nonempty()
      .min(5)
      .max(20)
      .regex(regexes.USERNAME_REGEX)
      .optional(),
    email: z.string().nonempty().email().optional(),
    password: z
      .string()
      .nonempty()
      .min(5)
      .max(20)
      .regex(regexes.PASSWORD_REGEX)
      .optional(),

    otp: z.string().nonempty().length(6).regex(/^\d+$/).optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  })
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
          <span className="text-destructive text-sm">
            {errDescription ??
              'This username has already been taken or your credentials are invalid'}
          </span>
        )}
        <FormField
          control={form.control}
          name="username"
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormDescription>
                Cannot be started with a digit. Must contain 5 to 20 characters
                without spaces: <em>a-z/0-9/_</em>
              </FormDescription>
              <FormControl>
                <Input placeholder="Enter your username..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          rules={{
            required: true,
          }}
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
                    placeholder="Enter your password..."
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
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
        {withSocials && (
          <>
            <span className="self-center">Or</span>
            <div className="flex items-center gap-[5px]">
              <a
                className="flex-1"
                href={`${config.SERVER_URL}/api/google/login`}
              >
                <Button className="w-full" type="button" variant={'outline'}>
                  <FontAwesomeIcon icon={faGoogle} />
                  Google
                </Button>
              </a>
              /
              <a
                className="flex-1"
                href={`${config.SERVER_URL}/api/github/login`}
              >
                <Button className="w-full" type="button" variant={'outline'}>
                  <FontAwesomeIcon icon={faGithub} />
                  Github
                </Button>
              </a>
            </div>
          </>
        )}
        <Button
          className="w-full mt-[10px]"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}

export const AppAuthFormDialog: React.FC<IAuthFormDialogProps> = ({
  formTitle,
  formDescription,
  onSubmit,
  err,
  errDescription,
  trigger,
  inputs,
  dirtyValues,
  opened,
  setOpened,
}) => {
  const formSchema = z.object({
    username: z
      .string()
      .nonempty()
      .min(5)
      .max(20)
      .regex(regexes.USERNAME_REGEX)
      .refine(val => val !== dirtyValues?.username, {
        message: 'The new username cannot be same as yours',
      })
      .optional(),
    email: z
      .string()
      .nonempty()
      .email()
      .refine(val => val !== dirtyValues?.email, {
        message: 'The new email cannot be same as yours',
      })
      .optional(),

    password: z
      .string()
      .nonempty()
      .min(5)
      .max(20)
      .regex(regexes.PASSWORD_REGEX)
      .optional(),
    confirmPassword: z
      .string()
      .nonempty()
      .min(5)
      .max(20)
      .regex(regexes.PASSWORD_REGEX)
      .optional(),

    otp: z.string().nonempty().length(6).regex(/^\d+$/).optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  })
  const [inputType, setInputType] = useState('password')

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
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
              <span className="text-destructive text-sm">
                {errDescription ??
                  'This username has already been taken or your credentials are invalid'}
              </span>
            )}
            {inputs.map((input, i) => {
              return (
                <FormField
                  key={i}
                  control={form.control}
                  name={input.name}
                  rules={{
                    required: true,
                  }}
                  defaultValue={input?.defaultValue}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{input.label}</FormLabel>
                      {input?.description && (
                        <FormDescription>{input.description}</FormDescription>
                      )}
                      {input?.type === 'otp' && (
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      )}
                      {input?.type === 'password' && (
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={inputType}
                              placeholder={
                                input?.placeholder ??
                                `Enter your ${input.name}...`
                              }
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
                      )}
                      {input?.type !== 'otp' && input?.type !== 'password' && (
                        <FormControl>
                          <Input
                            type={input?.type ?? 'text'}
                            placeholder={
                              input?.placeholder ??
                              `Enter your ${input.name}...`
                            }
                            {...field}
                          />
                        </FormControl>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            })}
            <DialogFooter className="mt-[10px]">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export const AppAuthFormDialogs: React.FC<IAuthFormDialogsProps> = ({
  modalProps,
  submodalProps,
}) => {
  const { onSubmit: modalOnSubmit, ...modalPropsPayload } = modalProps
  const { onSubmit: submodalOnSubmit, ...submodalPropsPayload } = submodalProps

  const [modalOpened, setModalOpened] = useState<boolean | undefined>(undefined)
  const [submodalOpened, setSubmodalOpened] = useState<boolean | undefined>(
    undefined
  )

  const [modalErr, setModalErr] = useState<
    { err: boolean; errDescription: string } | {}
  >({})
  const [submodalErr, setSubmodalErr] = useState<
    { err: boolean; errDescription: string } | {}
  >({})

  const [prevData, setPrevData] = useState({})

  return (
    <>
      <AppAuthFormDialog
        opened={modalOpened}
        setOpened={setModalOpened}
        onSubmit={async data => {
          const res = await modalOnSubmit(data)
          if (!res.answer) {
            setModalErr({
              err: true,
              errDescription: res.message,
            })
            return
          }

          setPrevData({ ...data, ...res.answer })
          setModalOpened(false)
          setSubmodalOpened(true)
        }}
        {...{ ...modalPropsPayload, ...modalErr }}
      />
      <AppAuthFormDialog
        opened={submodalOpened}
        setOpened={setSubmodalOpened}
        onSubmit={async data => {
          const res = await submodalOnSubmit({ ...data, ...prevData })
          if (!res.answer) {
            setSubmodalErr({
              err: true,
              errDescription: res.message,
            })
          }
        }}
        {...{ ...submodalPropsPayload, ...submodalErr }}
      />
    </>
  )
}

export default AppAuthForm

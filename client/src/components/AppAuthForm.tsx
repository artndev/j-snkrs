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
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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

// ? Fix validations for another types of dialogs
const formSchema = z.object({
  username: z.string().max(20).optional(),
  password: z.string().max(20).optional(),
  email: z.string().max(20).optional(),
  code: z.string().regex(/^\d+$/).optional(),
})

// ? Here! Found out some solutions
// Edit password / email / username separate dialog-forms
export const AppAuthFormDialog: React.FC<IAuthFormDialogProps> = ({
  formTitle,
  formDescription,
  onClick,
  onSubmit,
  err,
  errDescription,
  trigger,
  inputs,
  opened,
  setOpened,
}) => {
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
              <span className="italic text-(--destructive)">
                {errDescription ??
                  'This username has already been taken or your credentials are incorrect'}
              </span>
            )}
            {inputs.map((input, i) => {
              console.log(input.pattern)

              return (
                <FormField
                  key={i}
                  control={form.control}
                  name={input.name}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{input.label}</FormLabel>
                      {input?.description && (
                        <FormDescription>{input.description}</FormDescription>
                      )}
                      {!input.isOTP ? (
                        <>
                          {input?.type !== 'password' ? (
                            <FormControl>
                              <Input
                                type={input?.type ?? 'text'}
                                placeholder={
                                  input?.placeholder ??
                                  `Enter your ${input.name}...`
                                }
                                defaultValue={input?.defaultValue}
                                {...field}
                              />
                            </FormControl>
                          ) : (
                            <div className="relative">
                              <FormControl>
                                <Input
                                  type={inputType}
                                  placeholder={
                                    input?.placeholder ??
                                    `Enter your ${input.name}...`
                                  }
                                  defaultValue={input?.defaultValue}
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
                        </>
                      ) : (
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
              <Button type="submit" onClick={onClick}>
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
  const [modalOpened, setModalOpened] = useState<boolean | undefined>(undefined)
  const [submodalOpened, setSubmodalOpened] = useState<boolean | undefined>(
    undefined
  )

  // useEffect(() => {
  //   console.log('MODAL: ', modalOpened)
  // }, [modalOpened])

  // useEffect(() => {
  //   console.log('SUBMODAL: ', submodalOpened)
  // }, [submodalOpened])

  return (
    <>
      <AppAuthFormDialog
        onSubmit={e => {
          setModalOpened(false)
          setSubmodalOpened(true)
        }}
        opened={modalOpened}
        setOpened={setModalOpened}
        {...modalProps}
      />
      <AppAuthFormDialog
        // onClick={() => setSubmodalOpened(false)}
        opened={submodalOpened}
        setOpened={setSubmodalOpened}
        {...submodalProps}
      />
    </>
  )
}

export default AppAuthForm

import { Button, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormAnnotation } from './styles'

const claumUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa conter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode conter apenas letras e hifens. ',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claumUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claumUsernameFormSchema),
  })

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data)
  }

  return (
    <>
      <Form onSubmit={handleSubmit(handleClaimUsername)} as={'form'}>
        <TextInput
          size={'sm'}
          prefix="ignite.com/"
          placeholder="seu-usuário"
          {...register('username')}
        />
        <Button size={'sm'} type="submit">
          Reservar
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size={'sm'}>
          {errors.username
            ? errors.username?.message
            : 'Digite o nome do usuário desejado'}
        </Text>
      </FormAnnotation>
    </>
  )
}

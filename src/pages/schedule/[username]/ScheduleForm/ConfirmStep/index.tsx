import { Button, Text, TextArea, TextInput } from '@alphacall-ui/react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'

const confirmFormSchema = z.object({
  name: z.string().min(3, 'O nome precisa ter no mínimo três caracteres'),
  email: z.string().email('Digite um e-mail valido'),
  observations: z.string().optional(),
})

type ConfirmFormProps = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormProps>({
    resolver: zodResolver(confirmFormSchema),
  })

  function handleConfirmScheduling(data: ConfirmFormProps) {
    console.log(data)
  }

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')

  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
        </Text>
      </FormHeader>
      <label htmlFor="">
        <Text size={'sm'}>Nome Completo</Text>
        <TextInput {...register('name')} placeholder="Seu Nome" />
        {errors.name && (
          <FormError size={'sm'}>{errors.name.message}</FormError>
        )}
      </label>
      <label htmlFor="">
        <Text size={'sm'}>Endereço de e-mail</Text>
        <TextInput
          {...register('email')}
          type="email"
          placeholder="johndoe@example.com"
        />
        {errors.email && (
          <FormError size={'sm'}>{errors.email.message}</FormError>
        )}
      </label>
      <label htmlFor="">
        <Text size={'sm'}>Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button
          onClick={onCancelConfirmation}
          type="button"
          variant={'tertiary'}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}

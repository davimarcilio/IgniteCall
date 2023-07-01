import { Button, Text, TextArea, TextInput } from '@alphacall-ui/react'
import { ConfirmForm, FormActions, FormHeader } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'

export function ConfirmStep() {
  function handleConfirmScheduling() {}

  return (
    <ConfirmForm as="form" onSubmit={handleConfirmScheduling}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de setembro de 2022
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>
      <label htmlFor="">
        <Text size={'sm'}>Nome Completo</Text>
        <TextInput placeholder="Seu Nome" />
      </label>
      <label htmlFor="">
        <Text size={'sm'}>Endereço de e-mail</Text>
        <TextInput type="email" placeholder="johndoe@example.com" />
      </label>
      <label htmlFor="">
        <Text size={'sm'}>Observações</Text>
        <TextArea />
      </label>

      <FormActions>
        <Button type="button" variant={'tertiary'}>
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  )
}

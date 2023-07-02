import { Heading, Text } from '@alphacall-ui/react'
import { Container, Hero, Preview } from './styles'
import previewImage from '../../assets/previewImg.png'
import Image from 'next/image'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import { NextSeo } from 'next-seo'
export default function Home() {
  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Ignite Call"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre."
      />
      <Container>
        <Hero>
          <Heading as={'h1'} size={'4xl'}>
            Agendamento descomplicado
          </Heading>
          <Text size={'xl'}>
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>
          <ClaimUsernameForm />
        </Hero>
        <Preview>
          <Image
            src={previewImage}
            alt="Calendário simbolizando aplicacao em funcionamento"
            height={400}
            quality={100}
            priority
          />
        </Preview>
      </Container>
    </>
  )
}

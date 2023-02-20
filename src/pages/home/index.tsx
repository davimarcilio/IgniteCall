import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'
import previewImage from '../../assets/previewImg.png'
import Image from 'next/image'
export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading as={'h1'} size={'4xl'}>
          Agendamento descomplicado
        </Heading>
        <Text size={'xl'}>
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
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
  )
}

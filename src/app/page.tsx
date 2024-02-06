import { Container, Flex, Text } from '@radix-ui/themes'
import styles from './page.module.css'

const Home = () => {
  return (
    <Flex className={styles.appMain} grow="1">
      <Container>
        <Text>body</Text>
      </Container>
    </Flex>
  )
}

export default Home

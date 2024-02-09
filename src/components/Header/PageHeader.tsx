import { Container, Separator } from '@radix-ui/themes'
import styles from './PageHeader.module.css'

export const PageHeader = () => (
  <header className={styles.pageHeader}>
    <Container size="3"></Container>
    <Separator size="4" />
  </header>
)

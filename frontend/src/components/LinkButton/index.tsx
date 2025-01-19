import styles from './index.module.scss'
import { Link } from 'react-router'

const LinkButton = ({
  children,
  to,
}: {
  children: React.ReactNode
  to: string
}) => {
  return (
    <Link className={styles.button} to={to}>
      {children}
    </Link>
  )
}

export default LinkButton

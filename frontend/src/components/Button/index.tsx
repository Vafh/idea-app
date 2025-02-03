import cn from 'classnames'
import styles from './index.module.scss'
import { ButtonProps } from './index.types'

const Button = ({ children, loading = false }: ButtonProps) => {
  return (
    <button
      className={cn({
        [styles.button]: true,
        [styles.disabled]: loading,
        [styles.loading]: loading,
      })}
      type="submit"
      disabled={loading}
    >
      <span className={styles.text}>{children}</span>
    </button>
  )
}

export default Button

import cn from 'classnames'
import css from './index.module.scss'
import { ButtonProps } from './index.types'

const Button = ({ children, loading = false }: ButtonProps) => {
  return (
    <button
      className={cn({ [css.button]: true, [css.disabled]: loading })}
      type="submit"
      disabled={loading}
    >
      {loading ? 'Submitting...' : children}
    </button>
  )
}

export default Button

import cn from 'classnames'
import css from './index.module.scss'

const Button = ({
  children,
  loading = false,
}: {
  children: React.ReactNode
  loading?: boolean
}) => {
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
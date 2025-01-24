import cn from 'classnames'
import css from './index.module.scss'
import { AlertProps } from './index.types'

const Alert = ({ color, hidden, children }: AlertProps) => {
  if (hidden) {
    return null
  }
  return (
    <div className={cn({ [css.alert]: true, [css[color]]: true })}>
      {children}
    </div>
  )
}
export default Alert

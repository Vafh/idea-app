import styles from './index.module.scss'
import cn from 'classnames'

const Segment = ({
  title,
  size = 1,
  description,
  children,
  subTitle,
  className,
  classNameContent,
}: {
  title: React.ReactNode
  size?: 1 | 2
  description?: string
  children?: React.ReactNode
  subTitle?: string
  className?: string
  classNameContent?: string
}) => {
  return (
    <div className={cn({ [styles.segment]: true }, className)}>
      {subTitle && <p className={styles.subTitle}>{subTitle}</p>}
      {size === 1 ? (
        <h1 className={styles.title}>{title}</h1>
      ) : (
        <h2 className={styles.title}>{title}</h2>
      )}
      {description && <p className={styles.description}>{description}</p>}
      {children && (
        <div className={cn({ [styles.content]: true }, classNameContent)}>
          {children}
        </div>
      )}
    </div>
  )
}

export default Segment

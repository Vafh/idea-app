import cn from 'classnames'
import { type FormikProps } from 'formik'
import Alert from '../Alert'
import styles from './index.module.scss'

const Input = ({
  name,
  label,
  formik,
  maxWidth,
  type = 'text',
}: {
  name: string
  label: string
  formik: FormikProps<any>
  maxWidth?: number | 'none'
  type?: 'text' | 'password'
}) => {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]
  const disabled = formik.isSubmitting
  const invalid = !!error && !!touched

  return (
    <div
      className={cn({
        [styles.field]: true,
        [styles.disabled]: disabled,
      })}
    >
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        className={cn({
          [styles.input]: true,
          [styles.invalid]: invalid,
        })}
        style={{ maxWidth }}
        type={type}
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value)
        }}
        onBlur={() => {
          void formik.setFieldTouched(name)
        }}
        value={value}
        name={name}
        id={name}
        disabled={disabled}
      />
      {invalid && <Alert color="red">{error}</Alert>}
    </div>
  )
}

export default Input

import { type FormikProps } from 'formik'
import styles from './index.module.scss'
import PasswordEyeCloseIcon from '../../assets/password-eye-close.svg'
import PasswordEyeOpenIcon from '../../assets/password-eye-open.svg'
import Input from '../Input'
import { useState } from 'react'

const InputPassword = ({
  name,
  label,
  formik,
  ...props
}: {
  name: string
  label: string
  formik: FormikProps<any>
  maxWidth?: number | 'none'
}) => {
  const [isOpenPassword, setIsOpenPassword] = useState(false)
  return (
    <div className={styles.field}>
      <Input
        label={label}
        name={name}
        type={isOpenPassword ? 'text' : 'password'}
        formik={formik}
        {...props}
      />
      <img
        src={isOpenPassword ? PasswordEyeOpenIcon : PasswordEyeCloseIcon}
        alt="eye icon"
        className={styles.passwordIcon}
        onClick={() => setIsOpenPassword(!isOpenPassword)}
      />
    </div>
  )
}

export default InputPassword

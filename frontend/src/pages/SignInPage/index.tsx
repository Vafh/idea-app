import { validateSignInTrpcInput } from '@idea-app/backend/src/router/signIn/input'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'
import { Alert, Button, Input, Segment } from '../../components'
import { ROUTES } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import styles from './index.module.scss'
import DiscussingIdeasIcon from '../../assets/discussing-ideas.svg'
import InputPassword from '../../components/InputPassword'
import { useFormikForm } from '../../hooks'

const SignInPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()
  const signIn = trpc.signIn.useMutation()
  const { formik, buttonProps, alertProps } = useFormikForm({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validateSignInTrpcInput,
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values)
      Cookies.set('token', token, { expires: 99999 })
      trpcUtils.invalidate()
      navigate(ROUTES.mainPage())
    },
    resetOnSuccess: false,
  })

  const handleNavigateToRegister = () => navigate(ROUTES.signUp())

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <div className={styles.formShadow}>
          <Segment
            title="Sign In"
            subTitle="Welcome !"
            className={styles.segment}
            classNameContent={styles.segmentContent}
          >
            <form onSubmit={formik.handleSubmit} className={styles.formItems}>
              <div className={styles.inputs}>
                <Input
                  label="User name"
                  name="username"
                  formik={formik}
                  maxWidth="none"
                />
                <InputPassword
                  label="Password"
                  name="password"
                  formik={formik}
                  maxWidth="none"
                />
                <Alert {...alertProps} />
              </div>
              <Button {...buttonProps}>Login</Button>

              <p>
                If you don’t have an account{' '}
                <span
                  className={styles.register}
                  onClick={handleNavigateToRegister}
                >
                  register here!
                </span>
              </p>
            </form>
          </Segment>
        </div>
      </div>
      <div>
        <img src={DiscussingIdeasIcon} alt="discussion ideas icon" />
      </div>
    </div>
  )
}

export default SignInPage

import { validateSignUpTrpcInput } from '@idea-app/backend/src/router/signUp/input'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import { Alert, Button, Input, Segment } from '../../components'
import { ROUTES } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import InputPassword from '../../components/InputPassword'
import styles from './index.module.scss'
import DiscussingIdeasIcon from '../../assets/discussing-ideas.svg'
import { useFormikForm } from '../../hooks'

const SignUpPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()
  const signUp = trpc.signUp.useMutation()
  const { formik, buttonProps, alertProps } = useFormikForm({
    initialValues: {
      username: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: validateSignUpTrpcInput
      .extend({
        passwordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.password !== val.passwordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords must be the same',
            path: ['passwordAgain'],
          })
        }
      }),
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values)
      Cookies.set('token', token, { expires: 99999 })
      trpcUtils.invalidate()
      navigate(ROUTES.mainPage())
    },
    resetOnSuccess: false,
  })

  const handleNavigateToLogin = () => navigate(ROUTES.signIn())

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <div className={styles.formShadow}>
          <Segment
            title="Sign Up"
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
                <InputPassword
                  label="Confirm password"
                  name="passwordAgain"
                  formik={formik}
                  maxWidth="none"
                />
                <Alert {...alertProps} />
              </div>
              <Button {...buttonProps}>Register</Button>

              <p>
                Already have an Account?{' '}
                <span className={styles.login} onClick={handleNavigateToLogin}>
                  Login here!
                </span>
              </p>
            </form>
          </Segment>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <img src={DiscussingIdeasIcon} alt="discussion ideas icon" />
      </div>
    </div>
  )
}

export default SignUpPage

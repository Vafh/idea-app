import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { z } from 'zod'
import { trpc } from '../../lib/trpc'
import { validateSignUpTrpcInput } from '@idea-app/backend/src/router/signUp/input'
import { Alert, Button, FormItems, Input, Segment } from '../../components'

const SignUpPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signUp = trpc.signUp.useMutation()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(
      validateSignUpTrpcInput
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
    ),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        await signUp.mutateAsync(values)
        formik.resetForm()
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (err: any) {
        setSubmittingError(err.message)
      }
    },
  })

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Username" name="username" formik={formik} />
          <Input
            label="Password"
            name="password"
            type="password"
            formik={formik}
          />
          <Input
            label="Password again"
            name="passwordAgain"
            type="password"
            formik={formik}
          />
          {!formik.isValid && !!formik.submitCount && (
            <Alert color="red">Some fields are invalid</Alert>
          )}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMessageVisible && (
            <Alert color="green">Thanks for sign up!</Alert>
          )}
          <Button loading={formik.isSubmitting}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
}

export default SignUpPage

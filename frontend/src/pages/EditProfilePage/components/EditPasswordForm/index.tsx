import { validateUpdatePasswordTrpcInput } from '@idea-app/backend/src/router/updatePassword/input'
import { trpc } from '../../../../lib/trpc'
import { useFormikForm } from '../../../../hooks'
import { FormItems, Input, Alert, Button } from '../../../../components'
import { z } from 'zod'

const EditPasswordForm = () => {
  const updatePassword = trpc.updatePassword.useMutation()
  const { formik, alertProps, buttonProps } = useFormikForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    validationSchema: validateUpdatePasswordTrpcInput
      .extend({
        newPasswordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.newPassword !== val.newPasswordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords must be the same',
            path: ['newPasswordAgain'],
          })
        }
      }),
    onSubmit: async ({ newPassword, oldPassword }) => {
      await updatePassword.mutateAsync({ newPassword, oldPassword })
    },
    successMessage: 'Password updated',
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input
          label="Old password"
          name="oldPassword"
          type="password"
          formik={formik}
        />
        <Input
          label="New password"
          name="newPassword"
          type="password"
          formik={formik}
        />
        <Input
          label="New password again"
          name="newPasswordAgain"
          type="password"
          formik={formik}
        />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Password</Button>
      </FormItems>
    </form>
  )
}

export default EditPasswordForm

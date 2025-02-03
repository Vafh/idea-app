import { Alert, Button, FormItems, Input } from '../../../../components'
import { trpc } from '../../../../lib/trpc'
import type { TCurrentUser } from '../../../../lib/context'
import { useFormikForm } from '../../../../hooks'
import { validateUpdateProfileTrpcInput } from '@idea-app/backend/src/router/updateProfile/input'

const EditUsernameForm = ({
  currentUser,
}: {
  currentUser: NonNullable<TCurrentUser>
}) => {
  const trpcUtils = trpc.useUtils()
  const updateProfile = trpc.updateProfile.useMutation()
  const { formik, alertProps, buttonProps } = useFormikForm({
    initialValues: {
      username: currentUser.username,
    },
    validationSchema: validateUpdateProfileTrpcInput,
    onSubmit: async (values) => {
      const updatedCurrentUser = await updateProfile.mutateAsync(values)
      trpcUtils.getCurrentUser.setData(undefined, {
        currentUser: updatedCurrentUser,
      })
    },
    successMessage: 'Profile updated',
    resetOnSuccess: false,
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input label="username" name="username" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Profile</Button>
      </FormItems>
    </form>
  )
}

export default EditUsernameForm

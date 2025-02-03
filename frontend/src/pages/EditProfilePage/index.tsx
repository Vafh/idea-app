import { Alert, Button, FormItems } from '../../components'
import { Segment } from '../../components'
import { zUpdateProfileTrpcInput } from '@idea-app/backend/src/router/updateProfile/input'
import { useFormikForm, withPageWrapper } from '../../hooks'
import { trpc } from '../../lib/trpc'
import { Input } from '../../components'

const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ getAuthorizedUser }) => ({
    currentUser: getAuthorizedUser(),
  }),
})(({ currentUser }) => {
  const trpcUtils = trpc.useContext()
  const updateProfile = trpc.updateProfile.useMutation()
  const { formik, alertProps, buttonProps } = useFormikForm({
    initialValues: {
      username: currentUser.username!,
    },
    validationSchema: zUpdateProfileTrpcInput,
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
    <Segment title="Edit Profile">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="username" name="username" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update Profile</Button>
        </FormItems>
      </form>
    </Segment>
  )
})

export default EditProfilePage

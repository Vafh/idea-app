import { Segment } from '../../components'
import { withPageWrapper } from '../../hooks'
import { EditPasswordForm, EditUsernameForm } from './components'

const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ getAuthorizedUser }) => ({
    currentUser: getAuthorizedUser(),
  }),
})(({ currentUser }) => {
  return (
    <Segment title="Edit Profile">
      <Segment title="Username" size={2}>
        <EditUsernameForm currentUser={currentUser} />
      </Segment>
      <Segment title="Password" size={2}>
        <EditPasswordForm />
      </Segment>
    </Segment>
  )
})

export default EditProfilePage

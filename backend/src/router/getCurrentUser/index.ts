import { trpc } from '../../lib'
import { sendToClientCurrentUser } from '../../lib/models'

const getCurrentUser = trpc.procedure.query(({ ctx }) => {
  return {
    currentUser: sendToClientCurrentUser(ctx.currentUser),
  }
})

export default getCurrentUser

import { trpc } from '../../lib'
import _ from 'lodash'

const getCurrentUser = trpc.procedure.query(({ ctx }) => {
  return {
    currentUser: ctx.currentUser && _.pick(ctx.currentUser, ['id', 'username']),
  }
})

export default getCurrentUser

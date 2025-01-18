import _ from 'lodash'
import { trpc } from '../../lib'

const getCurrentUser = trpc.procedure.query(({ ctx }) => {
  return {
    currentUser: ctx.currentUser && _.pick(ctx.currentUser, ['id', 'username']),
  }
})

export default getCurrentUser

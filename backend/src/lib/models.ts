import { type User } from '@prisma/client'
import _ from 'lodash'

export const sendToClientCurrentUser = (user: User | null) => {
  return user && _.pick(user, ['id', 'username'])
}

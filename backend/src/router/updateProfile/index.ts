import { sendToClientCurrentUser } from '../../lib/models'
import { zUpdateProfileTrpcInput } from './input'
import { trpc } from '../../lib'

export const updateProfileTrpcRoute = trpc.procedure
  .input(zUpdateProfileTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.currentUser) {
      throw new Error('UNAUTHORIZED')
    }
    if (ctx.currentUser.username !== input.username) {
      const exUser = await ctx.prisma.user.findUnique({
        where: {
          username: input.username,
        },
      })
      if (exUser) {
        throw new Error('User with this username already exists')
      }
    }
    const updatedCurrentUser = await ctx.prisma.user.update({
      where: {
        id: ctx.currentUser.id,
      },
      data: input,
    })
    ctx.currentUser = updatedCurrentUser
    return sendToClientCurrentUser(updatedCurrentUser)
  })

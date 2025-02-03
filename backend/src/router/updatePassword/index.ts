import { validateUpdatePasswordTrpcInput } from './input'
import { trpc } from '../../lib'
import { getPasswordHash } from '../../utils'

export const updatePasswordTrpcRoute = trpc.procedure
  .input(validateUpdatePasswordTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.currentUser) {
      throw new Error('UNAUTHORIZED')
    }
    if (ctx.currentUser.password !== getPasswordHash(input.oldPassword)) {
      throw new Error('Wrong old password')
    }
    const updatedUser = await ctx.prisma.user.update({
      where: {
        id: ctx.currentUser.id,
      },
      data: {
        password: getPasswordHash(input.newPassword),
      },
    })
    ctx.currentUser = updatedUser
    return true
  })

import { trpc } from '../../lib/trpc'
import { validateSignUpTrpcInput } from './input'
import { getPasswordHash } from '../../utils'

export const signUpTrpcRoute = trpc.procedure
  .input(validateSignUpTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const exUser = await ctx.prisma.user.findUnique({
      where: {
        username: input.username,
      },
    })
    if (exUser) {
      throw new Error('User with this nick already exists')
    }
    await ctx.prisma.user.create({
      data: {
        username: input.username,
        password: getPasswordHash(input.password),
      },
    })
    return true
  })

import { trpc } from '../../lib/trpc'
import { getPasswordHash, signJWT } from '../../utils'
import { validateSignUpTrpcInput } from './input'

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
    const user = await ctx.prisma.user.create({
      data: {
        username: input.username,
        password: getPasswordHash(input.password),
      },
    })

    const token = signJWT(user.id)

    return { token }
  })

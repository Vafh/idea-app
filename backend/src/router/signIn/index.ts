import { trpc } from '../../lib/trpc'
import { getPasswordHash, signJWT } from '../../utils'
import { validateSignInTrpcInput } from './input'

export const signInTrpcRoute = trpc.procedure
  .input(validateSignInTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        username: input.username,
        password: getPasswordHash(input.password),
      },
    })
    if (!user) {
      throw new Error(
        'Wrong credentials (please check your username or password)',
      )
    }

    const token = signJWT(user.id)

    return { token }
  })

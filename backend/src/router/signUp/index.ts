import crypto from 'crypto'
import { trpc } from '../../lib/trpc'
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
    await ctx.prisma.user.create({
      data: {
        username: input.username,
        password: crypto
          .createHash('sha256')
          .update(input.password)
          .digest('hex'),
      },
    })
    return true
  })

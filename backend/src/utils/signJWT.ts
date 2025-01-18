import jwt from 'jsonwebtoken'
import { env } from '../lib/env'

const signJWT = (userId: string): string => {
  return jwt.sign(userId, env.JWT_SECRET)
}
export default signJWT

import jwt from 'jsonwebtoken'

const signJWT = (userId: string): string => {
  return jwt.sign(userId, 'not-really-secret-jwt-key')
}
export default signJWT

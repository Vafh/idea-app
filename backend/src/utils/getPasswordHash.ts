import { env } from '../lib/env'
import crypto from 'crypto'

const getPasswordHash = (password: string) =>
  crypto
    .createHash('sha256')
    .update(`${env.PASSWORD_SALT}${password}`)
    .digest('hex')

export default getPasswordHash

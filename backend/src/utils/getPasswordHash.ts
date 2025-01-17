import crypto from 'crypto'

const getPasswordHash = (password: string) =>
  crypto.createHash('sha256').update(password).digest('hex')

export default getPasswordHash

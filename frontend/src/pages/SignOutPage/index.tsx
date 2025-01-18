import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { trpc } from '../../lib/trpc'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../lib/routes'

const SignOutPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()
  useEffect(() => {
    Cookies.remove('token')
    void trpcUtils.invalidate().then(() => {
      navigate(ROUTES.signIn())
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <p>Loading...</p>
}

export default SignOutPage

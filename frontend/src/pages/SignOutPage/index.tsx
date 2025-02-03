import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { Loader } from '../../components'

const SignOutPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()
  useEffect(() => {
    Cookies.remove('token')
    void trpcUtils.invalidate().then(() => {
      navigate(ROUTES.signIn())
    })
  }, [navigate, trpcUtils])

  return <Loader type="page" />
}

export default SignOutPage

import { Link, Outlet, useNavigate } from 'react-router'
import { ROUTES } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import styles from './index.module.scss'

const Layout = () => {
  const navigate = useNavigate()
  const { data, isLoading, isFetching, isError } =
    trpc.getCurrentUser.useQuery()

  return (
    <div className={styles.layout}>
      <div className={styles.navigation}>
        <div className={styles.logo}>Recipes</div>
        <ul className={styles.menu}>
          <li className={styles.item}>
            <Link className={styles.link} to={ROUTES.mainPage()}>
              All recipes
            </Link>
          </li>
          {isLoading || isFetching || isError ? null : data.currentUser ? (
            <>
              <li className={styles.item}>
                <button onClick={() => navigate(ROUTES.createRecipe())}>
                  Create New Recipe
                </button>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={ROUTES.signOut()}>
                  Log Out ({data.currentUser?.username})
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={styles.item}>
                <Link className={styles.link} to={ROUTES.signUp()}>
                  Sign Up
                </Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={ROUTES.signIn()}>
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout

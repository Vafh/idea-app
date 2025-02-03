import { Link, Outlet, useNavigate } from 'react-router'
import { ROUTES } from '../../lib/routes'
import styles from './index.module.scss'
import { useCurrentUser } from '../../lib/context'
import { createRef } from 'react'

export const layoutContentRef = createRef<HTMLDivElement>()

const Layout = () => {
  const navigate = useNavigate()
  const currentUser = useCurrentUser()

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
          <li className={styles.item}>
            <Link className={styles.link} to={ROUTES.editProfile()}>
              Edit Profile
            </Link>
          </li>
          {currentUser ? (
            <>
              <li className={styles.item}>
                <button onClick={() => navigate(ROUTES.createRecipe())}>
                  Create New Recipe
                </button>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={ROUTES.signOut()}>
                  Log Out ({currentUser?.username})
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
      <div className={styles.content} ref={layoutContentRef}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout

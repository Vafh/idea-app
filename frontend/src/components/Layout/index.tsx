import { ROUTES } from '../../lib/routes'
import styles from './index.module.scss'
import { Link, Outlet, useNavigate } from 'react-router'

const Layout = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.layout}>
      <div className={styles.navigation}>
        <div className={styles.logo}>Recipes</div>
        <ul className={styles.menu}>
          <li className={styles.item}>
            <Link className={styles.link} to={ROUTES.mainPage()}>
              All recipes
            </Link>
            <button onClick={() => navigate(ROUTES.createRecipe())}>
              Create New Recipe
            </button>
          </li>
        </ul>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout

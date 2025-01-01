import { Link, Outlet } from 'react-router-dom'
import { ROUTES } from '../../lib/routes'
import styles from './index.module.scss'

const Layout = () => {
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
        </ul>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout

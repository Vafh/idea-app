import { ROUTES } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { Link } from 'react-router'
import styles from './index.module.scss'

const MainPage = () => {
  const { data, error, isLoading, isError, isFetching } =
    trpc.getRecipes.useQuery()

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1 className={styles.title}>Title</h1>
      <div className={styles.recipes}>
        {data?.recipes.map((recipe) => (
          <div className={styles.recipe} key={recipe.id}>
            <h2 className={styles.name}>
              <Link
                className={styles.link}
                to={ROUTES.viewRecipePage(recipe.id)}
              >
                {recipe.name}
              </Link>
            </h2>

            <p className={styles.description}>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default MainPage

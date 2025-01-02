import { ROUTES } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { Link } from 'react-router'
import styles from './index.module.scss'
import { Segment } from '../../components'

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
    <Segment title="All recipes">
      <div className={styles.recipes}>
        {data?.recipes.map((recipe) => (
          <div className={styles.recipe} key={recipe.id}>
            <Segment
              size={2}
              title={
                <Link
                  className={styles.link}
                  to={ROUTES.viewRecipePage(recipe.id)}
                >
                  {recipe.name}
                </Link>
              }
              description={recipe.description}
            ></Segment>
          </div>
        ))}
      </div>
    </Segment>
  )
}
export default MainPage

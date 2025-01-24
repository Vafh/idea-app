import { Link, useNavigate } from 'react-router'
import { Segment } from '../../components'
import { ROUTES } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import styles from './index.module.scss'
import { useCurrentUser } from '../../lib/context'

const MainPage = () => {
  const navigate = useNavigate()
  const { data, error, isLoading, isError, isFetching } =
    trpc.getRecipes.useQuery()

  const currentUser = useCurrentUser()

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  if (!currentUser) {
    navigate(ROUTES.signUp())
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

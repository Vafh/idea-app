import { Link, useNavigate } from 'react-router'
import { Segment } from '../../components'
import { ROUTES } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import styles from './index.module.scss'

const MainPage = () => {
  const navigate = useNavigate()
  const { data, error, isLoading, isError, isFetching } =
    trpc.getRecipes.useQuery()

  const getCurrentUserResult = trpc.getCurrentUser.useQuery()

  if (
    isLoading ||
    isFetching ||
    getCurrentUserResult.isLoading ||
    getCurrentUserResult.isFetching
  ) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  if (getCurrentUserResult.isError) {
    return <span>Error: {getCurrentUserResult.error.message}</span>
  }

  const currentUser = getCurrentUserResult.data.currentUser

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

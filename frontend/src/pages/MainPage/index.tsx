import { Link, useNavigate } from 'react-router'
import { Alert, Segment } from '../../components'
import { ROUTES } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import styles from './index.module.scss'
import { useCurrentUser } from '../../lib/context'

const MainPage = () => {
  const navigate = useNavigate()
  const {
    data,
    error,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = trpc.getRecipes.useInfiniteQuery(
    {
      limit: 2,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  )
  const currentUser = useCurrentUser()

  if (!currentUser) {
    navigate(ROUTES.signUp())
  }

  return (
    <Segment title="All recipes">
      {isLoading || isRefetching ? (
        <div>Loading...</div>
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div className={styles.recipes}>
          {data.pages
            .flatMap((page) => page.recipes)
            .map((recipe) => (
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
      )}
      <div className={styles.more}>
        {hasNextPage && !isFetchingNextPage && (
          <button
            onClick={() => {
              void fetchNextPage()
            }}
          >
            Load more
          </button>
        )}
        {isFetchingNextPage && <span>Loading...</span>}
      </div>
    </Segment>
  )
}
export default MainPage

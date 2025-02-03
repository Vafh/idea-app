import { Link, useNavigate } from 'react-router'
import { Alert, Loader, Segment } from '../../components'
import { ROUTES } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import styles from './index.module.scss'
import { useCurrentUser } from '../../lib/context'
import InfiniteScroll from 'react-infinite-scroller'
import { layoutContentRef } from '../../components/Layout'

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
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div className={styles.recipes}>
          <InfiniteScroll
            threshold={100}
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                void fetchNextPage()
              }
            }}
            hasMore={hasNextPage}
            loader={
              <div className={styles.loader} key="loader">
                <Loader type="section" />
              </div>
            }
            useWindow={
              (layoutContentRef.current &&
                getComputedStyle(layoutContentRef.current).overflow) !== 'auto'
            }
            getScrollParent={() => layoutContentRef.current}
          >
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
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  )
}
export default MainPage

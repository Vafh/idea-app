import { format } from 'date-fns'
import { useParams } from 'react-router'
import { LinkButton, Segment } from '../../components'
import { trpc } from '../../lib/trpc'
import styles from './index.module.scss'
import { ROUTES } from '../../lib/routes'

const ViewRecipePage = () => {
  const { id } = useParams()

  if (!id) {
    return <div>Recipe not found</div>
  }

  const getRecipeResult = trpc.getRecipe.useQuery({ id })

  const getCurrentUserResult = trpc.getCurrentUser.useQuery()

  if (
    getRecipeResult.isLoading ||
    getRecipeResult.isFetching ||
    getCurrentUserResult.isLoading ||
    getCurrentUserResult.isFetching
  ) {
    return <div>Loading...</div>
  }

  if (getRecipeResult.isError) {
    return <span>Error: {getRecipeResult.error.message}</span>
  }

  if (getCurrentUserResult.isError) {
    return <span>Error: {getCurrentUserResult.error.message}</span>
  }

  if (!getRecipeResult.data.recipe) {
    return <span>Recipe not found</span>
  }

  const recipe = getRecipeResult.data.recipe
  const currentUser = getCurrentUserResult.data.currentUser

  return (
    <Segment title={recipe.name} description={recipe.description}>
      <div className={styles.createdAt}>
        Created at: {format(recipe.createdAt, 'dd.MM.yyyy HH:mm')}
      </div>
      <div className={styles.author}>Author: {recipe.author.username}</div>
      <div
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: recipe.text }}
      />
      {currentUser?.id === recipe.authorId && (
        <div className={styles.editButton}>
          <LinkButton to={ROUTES.editRecipe(recipe.id)}>Edit Recipe</LinkButton>
        </div>
      )}
    </Segment>
  )
}
export default ViewRecipePage

import { format } from 'date-fns'
import { useParams } from 'react-router'
import { LinkButton, Segment } from '../../components'
import { trpc } from '../../lib/trpc'
import styles from './index.module.scss'
import { ROUTES } from '../../lib/routes'
import { useCurrentUser } from '../../lib/context'

const ViewRecipePage = () => {
  const { id } = useParams() as { id: string }

  const getRecipeResult = trpc.getRecipe.useQuery({ id })

  const currentUser = useCurrentUser()

  if (getRecipeResult.isLoading || getRecipeResult.isFetching) {
    return <div>Loading...</div>
  }

  if (getRecipeResult.isError) {
    return <span>Error: {getRecipeResult.error.message}</span>
  }

  if (!getRecipeResult.data.recipe) {
    return <span>Recipe not found</span>
  }

  const recipe = getRecipeResult.data.recipe

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

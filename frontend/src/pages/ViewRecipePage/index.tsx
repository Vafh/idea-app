import { format } from 'date-fns'
import { useParams } from 'react-router'
import { LinkButton, Segment } from '../../components'
import { trpc } from '../../lib/trpc'
import styles from './index.module.scss'
import { ROUTES } from '../../lib/routes'
import { withPageWrapper } from '../../hooks'

const ViewRecipePage = withPageWrapper({
  useQuery: () => {
    const { id } = useParams() as { id: string }
    return trpc.getRecipe.useQuery({
      id,
    })
  },
  checkExists: ({ queryResult }) => !!queryResult.data.recipe,
  checkExistsMessage: 'Idea not found',
  setProps: ({ queryResult, ctx }) => ({
    recipe: queryResult.data.recipe!,
    currentUser: ctx.currentUser,
  }),
})(({ recipe, currentUser }) => (
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
))
export default ViewRecipePage

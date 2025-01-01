import { useParams } from 'react-router'
import { trpc } from '../../lib/trpc'
import styles from './index.module.scss'

const ViewRecipePage = () => {
  const { id } = useParams()

  if (!id) {
    return <div>Recipe not found</div>
  }

  const { data, error, isLoading, isError, isFetching } =
    trpc.getRecipe.useQuery({ id })

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  if (!data.recipe) {
    return <div>Recipe not found</div>
  }

  return (
    <div>
      <h1 className={styles.title}>{data.recipe.name}</h1>
      <p className={styles.description}>
        Recipe description: <span>{data.recipe.description}</span>
      </p>
      <div
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: data.recipe.text }}
      />
    </div>
  )
}
export default ViewRecipePage

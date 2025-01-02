import { useParams } from 'react-router'
import { trpc } from '../../lib/trpc'
import styles from './index.module.scss'
import { Segment } from '../../components/Segment'

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
    <Segment title={data.recipe.name} description={data.recipe.description}>
      <div
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: data.recipe.text }}
      />
    </Segment>
  )
}
export default ViewRecipePage

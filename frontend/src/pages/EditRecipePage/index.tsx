import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import {
  Alert,
  Button,
  FormItems,
  Input,
  Segment,
  Textarea,
} from '../../components'
import { trpc } from '../../lib/trpc'
import { useNavigate, useParams } from 'react-router'
import { pick } from 'lodash'
import { ROUTES } from '../../lib/routes'
import { validateUpdateRecipeTrpcInput } from '@idea-app/backend/src/router/updateRecipe/input'
import { TrpcRouterOutput } from '@idea-app/backend/src/router'

const EditIdeaComponent = ({
  recipe,
}: {
  recipe: NonNullable<TrpcRouterOutput['getRecipe']['recipe']>
}) => {
  const navigate = useNavigate()
  const [submittingError, setSubmittingError] = useState<string | null>(null)

  const updateRecipe = trpc.updateRecipe.useMutation()

  const formik = useFormik({
    initialValues: pick(recipe, ['name', 'description', 'text', 'id']),
    validate: withZodSchema(
      validateUpdateRecipeTrpcInput.omit({ recipeId: true }),
    ),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        await updateRecipe.mutateAsync({ recipeId: recipe.id, ...values })
        navigate(ROUTES.viewRecipePage(recipe.id))
      } catch (err: any) {
        setSubmittingError(err.message)
      }
    },
  })

  return (
    <Segment title={`Edit Recipe ${recipe.author.username}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input
            name="description"
            maxWidth={500}
            label="Description"
            formik={formik}
          />
          <Textarea name="text" label="Text" formik={formik} />
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Update Recipe</Button>
        </FormItems>
      </form>
    </Segment>
  )
}

const EditRecipePage = () => {
  const { id } = useParams() as { id: string }
  const getRecipeResult = trpc.getRecipe.useQuery({
    id,
  })
  const getCurrentUserResult = trpc.getCurrentUser.useQuery()

  if (
    getRecipeResult.isLoading ||
    getRecipeResult.isFetching ||
    getCurrentUserResult.isLoading ||
    getCurrentUserResult.isFetching
  ) {
    return <span>Loading...</span>
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

  if (!currentUser) {
    return <span>Only for authorized</span>
  }

  if (currentUser.id !== recipe.authorId) {
    return <span>A recipe can only be edited by the author</span>
  }

  return <EditIdeaComponent recipe={recipe} />
}

export default EditRecipePage

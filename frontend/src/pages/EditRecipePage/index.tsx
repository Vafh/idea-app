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
import { useFormikForm } from '../../hooks'
import { useCurrentUser } from '../../lib/context'

const EditIdeaComponent = ({
  recipe,
}: {
  recipe: NonNullable<TrpcRouterOutput['getRecipe']['recipe']>
}) => {
  const navigate = useNavigate()
  const updateRecipe = trpc.updateRecipe.useMutation()

  const { formik, buttonProps, alertProps } = useFormikForm({
    initialValues: pick(recipe, ['name', 'description', 'text', 'id']),
    validationSchema: validateUpdateRecipeTrpcInput.omit({ recipeId: true }),
    onSubmit: async (values) => {
      await updateRecipe.mutateAsync({ recipeId: recipe.id, ...values })
      navigate(ROUTES.viewRecipePage(recipe.id))
    },
    resetOnSuccess: false,
    showValidationAlert: true,
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
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update Recipe</Button>
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
  const currentUser = useCurrentUser()

  if (getRecipeResult.isLoading || getRecipeResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getRecipeResult.isError) {
    return <span>Error: {getRecipeResult.error.message}</span>
  }

  if (!getRecipeResult.data.recipe) {
    return <span>Recipe not found</span>
  }

  const recipe = getRecipeResult.data.recipe

  if (!currentUser) {
    return <span>Only for authorized</span>
  }

  if (currentUser.id !== recipe.authorId) {
    return <span>A recipe can only be edited by the author</span>
  }

  return <EditIdeaComponent recipe={recipe} />
}

export default EditRecipePage

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
import { useFormikForm, withPageWrapper } from '../../hooks'

const EditRecipePage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { id } = useParams() as { id: string }
    return trpc.getRecipe.useQuery({
      id,
    })
  },
  checkExists: ({ queryResult }) => !!queryResult.data.recipe,
  checkExistsMessage: 'Recipe not found',
  checkAccess: ({ queryResult, ctx }) =>
    !!ctx.currentUser &&
    ctx.currentUser.id === queryResult.data.recipe?.authorId,
  checkAccessMessage: 'A recipe can only be edited by the author',
  setProps: ({ queryResult }) => ({
    recipe: queryResult.data.recipe!,
  }),
})(({ recipe }) => {
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
})

export default EditRecipePage

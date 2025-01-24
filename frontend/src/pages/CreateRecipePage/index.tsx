import { validateCreateRecipeTrpcInput } from '@idea-app/backend/src/router/createRecipeTrpcRoute/input'
import { v4 as uuid } from 'uuid'
import {
  Alert,
  Button,
  FormItems,
  Input,
  Segment,
  Textarea,
} from '../../components'
import { trpc } from '../../lib/trpc'
import { useFormikForm, withPageWrapper } from '../../hooks'

const CreateRecipePage = withPageWrapper({
  authorizedOnly: true,
})(() => {
  const createRecipe = trpc.createRecipe.useMutation()

  const { formik, buttonProps, alertProps } = useFormikForm({
    initialValues: {
      name: '',
      description: '',
      text: '',
      id: uuid(),
    },
    validationSchema: validateCreateRecipeTrpcInput,
    onSubmit: async (values) => {
      await createRecipe.mutateAsync(values)
      formik.resetForm()
    },
    successMessage: 'Recipe created successfully!',
    showValidationAlert: true,
  })

  return (
    <Segment title="New Recipe">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
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
          <Button {...buttonProps}>Create Recipe</Button>
        </FormItems>
      </form>
    </Segment>
  )
})

export default CreateRecipePage

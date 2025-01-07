import { useFormik } from 'formik'
import { Input, Segment, Textarea } from '../../components'
import { v4 as uuid } from 'uuid'
import { withZodSchema } from 'formik-validator-zod'
import { trpc } from '../../lib/trpc'
import { validateCreateRecipeTrpcInput } from '@idea-app/backend/src/router/createRecipeTrpcRoute/input'

const CreateRecipePage = () => {
  const createRecipe = trpc.createRecipe.useMutation()

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      text: '',
      id: uuid(),
    },
    validate: withZodSchema(validateCreateRecipeTrpcInput),
    onSubmit: async (values) => await createRecipe.mutateAsync(values),
  })

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Input name="name" label="Name" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />
        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}

export default CreateRecipePage

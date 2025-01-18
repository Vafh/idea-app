import { validateCreateRecipeTrpcInput } from '@idea-app/backend/src/router/createRecipeTrpcRoute/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
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

const CreateRecipePage = () => {
  const [successMsgVisible, setSuccessMsgVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)

  const createRecipe = trpc.createRecipe.useMutation()

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      text: '',
      id: uuid(),
    },
    validate: withZodSchema(validateCreateRecipeTrpcInput),
    onSubmit: async (values) => {
      try {
        await createRecipe.mutateAsync(values)
        formik.resetForm()
        setSuccessMsgVisible(true)
        setTimeout(() => {
          setSuccessMsgVisible(false)
        }, 3000)
      } catch (error: any) {
        setSubmittingError(error.message)
        setTimeout(() => {
          setSubmittingError(null)
        }, 3000)
      }
    },
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
          {successMsgVisible && (
            <Alert color="green">Recipe created successfully!</Alert>
          )}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Create Recipe</Button>
        </FormItems>
      </form>
    </Segment>
  )
}

export default CreateRecipePage

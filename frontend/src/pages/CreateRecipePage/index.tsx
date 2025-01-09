import { useFormik } from 'formik'
import { Alert, Input, Segment, Textarea } from '../../components'
import { v4 as uuid } from 'uuid'
import { withZodSchema } from 'formik-validator-zod'
import { trpc } from '../../lib/trpc'
import { validateCreateRecipeTrpcInput } from '@idea-app/backend/src/router/createRecipeTrpcRoute/input'
import { useState } from 'react'

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
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Create Recipe'}
        </button>
      </form>
    </Segment>
  )
}

export default CreateRecipePage

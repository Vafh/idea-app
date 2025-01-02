import { useFormik } from 'formik'
import { Input, Segment, Textarea } from '../../components'
import { v4 as uuid } from 'uuid'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'

const CreateRecipePage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(
      z.object({
        name: z.string().nonempty('Name is required'),
        description: z.string().nonempty('Description is required'),
        text: z.string().nonempty('Text is required').min(10, {
          message: 'Text should be at least 10 characters long',
        }),
      }),
    ),
    onSubmit: (values) => {
      console.info('Submitted', { ...values, id: uuid() })
    },
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

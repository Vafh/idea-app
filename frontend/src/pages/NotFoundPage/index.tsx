import { ErrorPageComponent } from '../../components'

const NotFoundPage = ({
  title = 'Not Found',
  message = 'This page does not exist',
}: {
  title?: string
  message?: string
}) => <ErrorPageComponent title={title} message={message} />

export default NotFoundPage

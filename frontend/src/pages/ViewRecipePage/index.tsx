import { useParams } from 'react-router'

const ViewRecipePage = () => {
  const { id } = useParams()
  return (
    <div>
      <h1>Title recipe {id}</h1>
      <p>Recipe description</p>
      <div>
        <h2>Ingredients</h2>
        <ul>
          <li>Ingredient 1</li>
          <li>Ingredient 2</li>
        </ul>
      </div>
    </div>
  )
}
export default ViewRecipePage

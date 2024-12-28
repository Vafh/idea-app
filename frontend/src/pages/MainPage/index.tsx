import { trpc } from '../../lib/trpc'

const MainPage = () => {
  const { data, error, isLoading, isError, isFetching } = trpc.getRecipes.useQuery()

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Title</h1>
      <div>
        {data?.recipes.map((recipe) => (
          <div key={recipe.name}>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default MainPage

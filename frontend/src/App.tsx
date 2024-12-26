import React from 'react'

const App = () => {
  const recipes = [
    { name: 'Recipe name 1', description: 'Recipe description...' },
    { name: 'Recipe name 2', description: 'Recipe description...' },
    { name: 'Recipe name 3', description: 'Recipe description...' },
  ]
  return (
    <div>
      <h1>Title</h1>
      <div>
        {recipes.map((recipe, index) => (
          <div key={index}>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

export const ROUTES = {
  mainPage: () => '/',
  viewRecipePage: (id: string | 'id') => `/recipe/${id}`,
  createRecipe: () => '/recipe/create',
}

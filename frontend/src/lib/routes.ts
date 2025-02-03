export const ROUTES = {
  mainPage: () => '/',
  viewRecipePage: (id: string | 'id') => `/recipe/${id}`,
  createRecipe: () => '/recipe/create',
  signUp: () => '/sign-up',
  signIn: () => '/sign-in',
  signOut: () => '/sign-out',
  editRecipe: (id: string) => `/recipe/${id}/edit`,
  notFound: () => '/not-found',
  editProfile: () => '/edit-profile',
}

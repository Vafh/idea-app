export const ROUTES = {
  mainPage: () => '/',
  viewRecipePage: (id: number | 'id') => `/recipe/:${id}`,
}

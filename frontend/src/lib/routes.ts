export const ROUTES = {
  MainPage: () => '/',
  ViewRecipePage: (id: number | 'id') => `/recipe/:${id}`,
}

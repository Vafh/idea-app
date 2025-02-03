import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components'
import { ROUTES } from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import {
  CreateRecipePage,
  MainPage,
  ViewRecipePage,
  SignUpPage,
  SignInPage,
  SignOutPage,
  NotFoundPage,
  EditProfilePage,
} from './pages'
import './styles/global.scss'
import EditRecipePage from './pages/EditRecipePage'
import { AppContextProvider } from './lib/context'

const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.signOut()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route
                path={ROUTES.viewRecipePage(':id')}
                element={<ViewRecipePage />}
              />
              <Route
                path={ROUTES.createRecipe()}
                element={<CreateRecipePage />}
              />
              <Route
                path={ROUTES.editRecipe(':id')}
                element={<EditRecipePage />}
              />
              <Route
                path={ROUTES.editProfile()}
                element={<EditProfilePage />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path={ROUTES.signIn()} element={<SignInPage />} />
            <Route path={ROUTES.signUp()} element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}

export default App

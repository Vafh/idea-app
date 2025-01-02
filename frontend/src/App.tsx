import { BrowserRouter, Route, Routes } from 'react-router'
import { TrpcProvider } from './lib/trpc'
import { CreateRecipePage, MainPage, ViewRecipePage } from './pages'
import { ROUTES } from './lib/routes'
import { Layout } from './components'
import './styles/global.scss'

const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
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
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}

export default App

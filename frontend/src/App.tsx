import { BrowserRouter, Route, Routes } from 'react-router'
import { TrpcProvider } from './lib/trpc'
import { MainPage, ViewRecipePage } from './pages'
import { ROUTES } from './lib/routes'

const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path={ROUTES.viewRecipePage('id')} element={<ViewRecipePage />} />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}

export default App

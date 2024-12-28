import { TrpcProvider } from './lib/trpc'
import { MainPage } from './pages'

const App = () => {
  return (
    <TrpcProvider>
      <MainPage />
    </TrpcProvider>
  )
}

export default App

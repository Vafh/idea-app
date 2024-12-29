import { TrpcProvider } from './lib/trpc'
import { MainPage } from './pages'

const App = () => {
  if (Math.random()) console.log('test')
  return (
    <TrpcProvider>
      <MainPage />
    </TrpcProvider>
  )
}

export default App

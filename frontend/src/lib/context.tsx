import { createContext, useContext } from 'react'
import { trpc } from './trpc'
import { TrpcRouterOutput } from '@idea-app/backend/src/router'

export type TCurrentUser = TrpcRouterOutput['getCurrentUser']['currentUser']

export type AppContext = {
  currentUser: TCurrentUser
}

const AppReactContext = createContext<AppContext>({
  currentUser: null,
})

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { data, error, isLoading, isFetching, isError } =
    trpc.getCurrentUser.useQuery()
  return (
    <AppReactContext.Provider
      value={{
        currentUser: data?.currentUser || null,
      }}
    >
      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        children
      )}
    </AppReactContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppReactContext)
}

export const useCurrentUser = () => {
  const { currentUser } = useAppContext()
  return currentUser
}

import {
  type UseTRPCQueryResult,
  type UseTRPCQuerySuccessResult,
} from '@trpc/react-query/shared'
import React, { useEffect } from 'react'
import { useAppContext, type AppContext } from '../lib/context'
import { useNavigate } from 'react-router'
import { ROUTES } from '../lib/routes'
import { ErrorPageComponent } from '../components'
import { NotFoundPage } from '../pages'

class CheckExistsError extends Error {}

const checkExistsFn = <T,>(value: T, message?: string): NonNullable<T> => {
  if (!value) {
    throw new CheckExistsError(message)
  }
  return value
}
class CheckAccessError extends Error {}

const checkAccessFn = <T,>(value: T, message?: string): void => {
  if (!value) {
    throw new CheckAccessError(message)
  }
}

class GetAuthorizedUserError extends Error {}

type Props = Record<string, any>
type QueryResult = UseTRPCQueryResult<any, any>
type QuerySuccessResult<TQueryResult extends QueryResult> =
  UseTRPCQuerySuccessResult<NonNullable<TQueryResult['data']>, null>
type HelperProps<TQueryResult extends QueryResult | undefined> = {
  ctx: AppContext
  queryResult: TQueryResult extends QueryResult
    ? QuerySuccessResult<TQueryResult>
    : undefined
}
type SetPropsProps<TQueryResult extends QueryResult | undefined> =
  HelperProps<TQueryResult> & {
    checkExists: typeof checkExistsFn
    checkAccess: typeof checkAccessFn
    getAuthorizedUser: (
      message?: string,
    ) => NonNullable<AppContext['currentUser']>
  }
type PageWrapperProps<
  TProps extends Props,
  TQueryResult extends QueryResult | undefined,
> = {
  redirectAuthorized?: boolean

  authorizedOnly?: boolean
  authorizedOnlyTitle?: string
  authorizedOnlyMessage?: string

  checkAccess?: (helperProps: HelperProps<TQueryResult>) => boolean
  checkAccessTitle?: string
  checkAccessMessage?: string

  checkExists?: (helperProps: HelperProps<TQueryResult>) => boolean
  checkExistsTitle?: string
  checkExistsMessage?: string

  useQuery?: () => TQueryResult
  setProps?: (setPropsProps: SetPropsProps<TQueryResult>) => TProps
  Page: React.FC<TProps>
}

const PageWrapper = <
  TProps extends Props = {},
  TQueryResult extends QueryResult | undefined = undefined,
>({
  authorizedOnly,
  authorizedOnlyTitle = 'Please, Authorize',
  authorizedOnlyMessage = 'This page is available only for authorized users',
  redirectAuthorized,
  checkAccess,
  checkAccessTitle = 'Access Denied',
  checkAccessMessage = 'You have no access to this page',
  checkExists,
  checkExistsTitle,
  checkExistsMessage,
  useQuery,
  setProps,
  Page,
}: PageWrapperProps<TProps, TQueryResult>) => {
  const navigate = useNavigate()
  const ctx = useAppContext()
  const queryResult = useQuery?.()

  const redirectNeeded = redirectAuthorized && ctx.currentUser

  useEffect(() => {
    if (redirectNeeded) {
      navigate(ROUTES.mainPage(), { replace: true })
    }
  }, [redirectNeeded, navigate])

  if (queryResult?.isLoading || queryResult?.isFetching || redirectNeeded) {
    return <p>Loading...</p>
  }

  if (queryResult?.isError) {
    return <ErrorPageComponent message={queryResult.error.message} />
  }

  if (authorizedOnly && !ctx.currentUser) {
    return (
      <ErrorPageComponent
        title={authorizedOnlyTitle}
        message={authorizedOnlyMessage}
      />
    )
  }

  const helperProps = { ctx, queryResult: queryResult as never }

  if (checkAccess) {
    const accessDenied = !checkAccess(helperProps)
    if (accessDenied) {
      return (
        <ErrorPageComponent
          title={checkAccessTitle}
          message={checkAccessMessage}
        />
      )
    }
  }

  if (checkExists) {
    const notExists = !checkExists(helperProps)
    if (notExists) {
      return (
        <NotFoundPage title={checkExistsTitle} message={checkExistsMessage} />
      )
    }
  }

  const getAuthorizedUser = (message?: string) => {
    if (!ctx.currentUser) {
      throw new GetAuthorizedUserError(message)
    }
    return ctx.currentUser
  }

  try {
    const props = setProps?.({
      ...helperProps,
      checkExists: checkExistsFn,
      checkAccess: checkAccessFn,
      getAuthorizedUser,
    }) as TProps
    return <Page {...props} />
  } catch (error) {
    if (error instanceof CheckExistsError) {
      return (
        <NotFoundPage
          title={checkExistsTitle}
          message={error.message || checkExistsMessage}
        />
      )
    }
    if (error instanceof CheckAccessError) {
      return (
        <ErrorPageComponent
          title={checkAccessTitle}
          message={error.message || checkAccessMessage}
        />
      )
    }
    if (error instanceof GetAuthorizedUserError) {
      return (
        <ErrorPageComponent
          title={authorizedOnlyTitle}
          message={error.message || authorizedOnlyMessage}
        />
      )
    }
    throw error
  }
}

const withPageWrapper = <
  TProps extends Props = {},
  TQueryResult extends QueryResult | undefined = undefined,
>(
  pageWrapperProps: Omit<PageWrapperProps<TProps, TQueryResult>, 'Page'>,
) => {
  return (Page: PageWrapperProps<TProps, TQueryResult>['Page']) => {
    return () => <PageWrapper {...pageWrapperProps} Page={Page} />
  }
}

export default withPageWrapper

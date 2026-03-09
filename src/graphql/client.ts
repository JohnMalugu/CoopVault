import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { useAuthStore } from '@/store/authStore'

const GRAPHQL_URL =
  import.meta.env.VITE_GRAPHQL_URL ?? 'http://localhost:8080/graphql'

const httpLink = createHttpLink({ uri: GRAPHQL_URL })

const authLink = setContext((_, { headers }) => {
  const tokens = useAuthStore.getState().tokens
  return {
    headers: {
      ...headers,
      authorization: tokens?.accessToken
        ? `Bearer ${tokens.accessToken}`
        : '',
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.warn(`[GraphQL error]: ${message}`, { locations, path })
    )
  }
  if (networkError) {
    console.warn('[Network error]:', networkError)
  }
})

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' },
  },
})

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://rickandmortyapi.com/graphql', // Use the GraphQL endpoint of the Rick and Morty API
  }),
  cache: new InMemoryCache(),
});

export { apolloClient };

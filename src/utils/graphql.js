import { 
    ApolloClient, 
    InMemoryCache, 
    HttpLink 
} from '@apollo/client';

const httpLink = new HttpLink({ 
    uri: 'https://demo.admin.beacons.gg/graphql'
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});
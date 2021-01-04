import { 
    ApolloClient, 
    InMemoryCache, 
    HttpLink 
} from '@apollo/client';

const httpLink = new HttpLink({ 
  	uri: 'http://localhost:8081/graphql'
});

export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
});

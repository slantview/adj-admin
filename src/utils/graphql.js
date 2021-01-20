import { 
    ApolloClient, 
    InMemoryCache, 
    HttpLink 
} from '@apollo/client';
import _ from 'lodash';

const httpLink = new HttpLink({ 
  	uri: 'http://localhost:8081/graphql'
});

export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
});

export const getClient = (backend, token) => {
    const httpAuthBackendLink = new HttpLink({ 
        uri: backend,
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const httpNoAuthBackendLink = new HttpLink({ 
        uri: backend,
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    return new ApolloClient({
        link: token ? httpAuthBackendLink : httpNoAuthBackendLink,
        cache: new InMemoryCache()
    });
}
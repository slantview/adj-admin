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

export const getClient = (backend) => {
    const httpBackendLink = new HttpLink({ 
        uri: backend
    });
    return new ApolloClient({
        link: httpBackendLink,
        cache: new InMemoryCache()
    });
}
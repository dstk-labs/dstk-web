import {
    ApolloClient,
    ApolloProvider as Provider,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
});

const authLink = setContext(() => {
    return {
        headers: {
            ...Headers,
            authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

type ApolloProviderProps = {
    children: React.ReactNode;
};

export const ApolloProvider = ({ children }: ApolloProviderProps) => {
    return <Provider client={client}>{children}</Provider>;
};

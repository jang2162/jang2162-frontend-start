import { ApolloClient, InMemoryCache } from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { cookies } from 'next/headers';

import {getLinks} from '@/lib/apollo/getLinks';

export const { getClient } = registerApolloClient(() => {
    const token = cookies().get('token');
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: getLinks(false,  setContext((operation, prevContext) => ({
            ...prevContext
            , token
        })))
    });
});

import React from 'react';

import {ApolloProvider} from '@apollo/client';
import {usePathname, useRouter} from 'next/navigation';

export default function Aaa() {
    const pathname = usePathname()
    console.log(pathname);
    return (
        <div>
            asdasdasd
            aaaaa
        </div>
    );
}

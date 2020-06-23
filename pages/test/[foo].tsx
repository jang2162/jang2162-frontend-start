import {initializeApollo} from '@/apollo';
import Test from '@/components/Test/Test';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import {GetStaticProps} from 'next';
import Link from 'next/link';
import * as React from 'react'

const SAMPLE_POSTS = gql`
    query {
        samplePosts {
            list {
                id
                subject
                content
                writer {
                    name
                }
                writer_id
            }
        }
    }
`
export default function(props: {hello: string}) {
    const { loading, error, data } = useQuery(SAMPLE_POSTS);
    if (loading) { return <p>Loading...</p>; }
    if (error) { return <p>Error :(</p>; }

    return (
        <>
            <div style={{padding: 50}}>
                <Test test={props.hello}/>
            </div>
            <Link href="/">
                <a>Goto Index</a>
            </Link>
            {data.samplePosts.list.map((post: any) => (<div key={post.id}>{post.subject}</div>))}
        </>
    )
};

export async function getStaticPaths() {
    return {
        paths: [
            { params: { foo: 'bar' } }
        ],
        fallback: true
    };
}


export const getStaticProps: GetStaticProps = async (context) => {
    console.log(context);
    const apolloClient = initializeApollo();
    await apolloClient.query({
        query: SAMPLE_POSTS
    });
    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
            hello: '안녕',
            layout: 'DEFAULT'
        }
    }
}
import Test from '@/components/Test/Test';
import * as React from 'react'

export const TestPage = (props: {hello: string}) => {
    return (
        <>
            <div style={{padding: 50}}>
                <Test test={props.hello}/>
            </div>

        </>
    )
};

TestPage.getInitialProps = async () => {
    return {
        hello: '안녕'
    }
};

export default TestPage;
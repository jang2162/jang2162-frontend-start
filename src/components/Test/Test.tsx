import {Button} from '@/common/Styled';
import container, {propType} from '@/components/Test/TestContainer';
import withVisualizeRender from '@/lib/RenderVisualizer';
import React from 'react';

const Test = (props: propType & {test: string}) => {
    const click = () => props.changeNameAndDelayedAdd({addNum: 5, name: 'NEW TEST'});
    return (
        <div style={{padding: 20}}>
            {props.test}<br/><br/>
            Name: {props.name} <br/>
            Counter value: {props.value} <br/>
            <Button onClick={click}>TEST</Button>
        </div>
    )
};
export default container(withVisualizeRender(Test));

import {Button} from '@/common/Styled';
import withVisualizeRender from '@/lib/RenderVisualizer';
import useSelector from '@/lib/UseSelector';
import {TestActions} from '@/modules/TestModule';
import React from 'react';
import {useDispatch} from 'react-redux';

const Test = (props: {test: string}) => {
    const name = useSelector(state => state.test.name);
    const value = useSelector(state => state.test.counter.value);
    const dispatch = useDispatch();

    const click = () => dispatch(TestActions.changeNameAndDelayedAdd({addNum: 5, name: 'NEW TEST'}));
    return (
        <div style={{padding: 20}}>
            {props.test}<br/><br/>
            Name: {name} <br/>
            Counter value: {value} <br/>
            <Button onClick={click}>TEST</Button>
        </div>
    )
};
export default withVisualizeRender(Test);

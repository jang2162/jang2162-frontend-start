import {Button} from '@/components/common/components/Button';
import useSelector from '@/lib/UseSelector';
import {testActions} from '@/modules/TestModule';
import React from 'react';
import {useDispatch} from 'react-redux';

const Test = (props: {test: string}) => {
    const name = useSelector(state => state.test.name);
    const value = useSelector(state => state.test.counter.value);
    const dispatch = useDispatch();
    const click = () => dispatch(testActions.changeNameAndDelayedAdd({addNum: 5, name: 'NEW TEST'}));
    return (
        <div style={{padding: 20}}>
            {props.test}<br/><br/>
            Name: {name} <br/>
            Counter value: {value} <br/>
            <Button onClick={click}>TEST</Button>
        </div>

    )
};
export default Test;

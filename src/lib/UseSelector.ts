import {RootState} from '@/store';
import {useSelector as _useSelector} from 'react-redux';

function useSelector<TSelected>(selector: (state: RootState) => TSelected, equalityFn?: (A: TSelected, B: TSelected) => boolean ) {
    return _useSelector(selector, equalityFn);
}

export default useSelector;
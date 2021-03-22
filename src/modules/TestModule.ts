import {createActionCreators, createReducerFunction, ImmerReducer} from '@/lib/MyImmerReducer';
import {SimpleEpic} from '@/lib/simple-epic';
import {RootState} from '@/store';
import {Epic, ofType} from 'redux-observable';
import {concat, of} from 'rxjs';
import {delay, flatMap} from 'rxjs/operators';

export interface TestState {
    name: string;
    counter: {
        value: number;
    }
}

const initialState: TestState = {
    name: 'TEST',
    counter: {
        value: 555
    }
};

class TestReducer extends ImmerReducer<TestState> {
    increment(payload = 1) {
        this.draftState.counter.value += payload;
    }

    decrement(payload = 1) {
        this.draftState.counter.value -= payload;
    }

    setName(payload: string) {
        this.draftState.name = payload;
    }
    changeNameAndDelayedAdd(payload: {addNum:number, name:string}) {}
}

export const testActions = createActionCreators(TestReducer);
export default createReducerFunction(TestReducer, initialState);

const changeNameAndDelayedAddEpic: SimpleEpic<typeof testActions.changeNameAndDelayedAdd, RootState> = (action$, state$) =>
    action$.pipe(
        ofType(testActions.changeNameAndDelayedAdd.type),
        flatMap(action =>
            concat(
                of(testActions.setName(action.payload.name)),
                of(testActions.increment(action.payload.addNum)).pipe(
                    delay(500)
                )
            )
        )
    );

export const testEpics = [changeNameAndDelayedAddEpic];

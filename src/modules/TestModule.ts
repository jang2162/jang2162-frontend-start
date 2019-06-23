import {Epic} from '@/lib/SimpleEpic';
import {RootState} from '@/store';
import {createActionCreators, createReducerFunction, ImmerReducer} from 'immer-reducer';
import {ofType} from 'redux-observable';
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
    increment(payload: number = 1) {
        this.draftState.counter.value += payload;
    }

    decrement(payload: number = 1) {
        this.draftState.counter.value -= payload;
    }

    setName(payload: string) {
        this.draftState.name = payload;
    }
    changeNameAndDelayedAdd(payload: {addNum:number, name:string}) {}
}

export const TestActions = createActionCreators(TestReducer);
export default createReducerFunction(TestReducer, initialState);

const changeNameAndDelayedAddEpic: Epic<typeof TestActions.changeNameAndDelayedAdd, RootState> = (action$, state$) =>
    action$.pipe(
        ofType(TestActions.changeNameAndDelayedAdd.type),
        flatMap(action =>
            concat(
                of(TestActions.setName(action.payload.name)),
                of(TestActions.increment(action.payload.addNum)).pipe(
                    delay(500)
                )
            )
        )
    );

export const TestEpics = [changeNameAndDelayedAddEpic];

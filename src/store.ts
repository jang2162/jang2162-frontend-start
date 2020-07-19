import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {combineEpics, createEpicMiddleware, ofType} from 'redux-observable';
import {BehaviorSubject} from 'rxjs';
import {mergeMap, takeUntil} from 'rxjs/operators';
import test, {testEpics, TestState} from './modules/TestModule';

export interface RootState {
    test: TestState;
}

const rootReducer = combineReducers<RootState>({
    test,
});

const epicMiddleware = createEpicMiddleware();
const rootEpic = combineEpics<any>(
    ...testEpics,
);

const middleware: any[] = [];
if (process.env.NODE_ENV === 'production') {
    middleware.push(applyMiddleware(epicMiddleware));
} else {
    middleware.push(composeWithDevTools(applyMiddleware(epicMiddleware)));
}

export const store = createStore(rootReducer, compose(...middleware));

const epic$ = new BehaviorSubject(rootEpic);
const hotReloadingEpic: any = (action$: any, ...rest: any) =>
    epic$.pipe(
        mergeMap(epic =>
            epic(action$, ...rest).pipe(
                takeUntil(action$.pipe(
                    ofType('EPIC_END')
                ))
            )
        )
    );
epicMiddleware.run(hotReloadingEpic);

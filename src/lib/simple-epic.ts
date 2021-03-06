import { Action } from 'redux';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
export declare type SimpleEpic<ActionCreator extends (...args: any[]) => Action = any, State = any> = (action$: ActionsObservable<ReturnType<ActionCreator>>, state$: StateObservable<State>, dependencies: any) => Observable<any>;

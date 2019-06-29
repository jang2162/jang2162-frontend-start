import {createActionCreators, createReducerFunction, ImmerReducer, setPrefix} from 'immer-reducer'

setPrefix('MY_APP');

export {createActionCreators, createReducerFunction, ImmerReducer};
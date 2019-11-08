import {  Record } from "./Data";

// action strings
export const GET_DATA = "GET_DATA";
export const FETCH_DATA_BEGIN = "FETCH_DATA_BEGIN"
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS"
export const FETCH_DATA_ERROR = "FETCH_DATA_ERROR"



export interface FetchDataBegin {
    type: typeof FETCH_DATA_BEGIN

}


export interface FetchDataSuccess {
    type: typeof FETCH_DATA_SUCCESS,
    payload: Record[]

}

export interface FetchDataError {
    type: typeof FETCH_DATA_ERROR

}
export type DataActionTypes =
    | FetchDataBegin
    | FetchDataSuccess
    | FetchDataError

export type AppActions = DataActionTypes;

import { UserInterface } from './UserInterface';

export const TOGGLE_NAVTOP = "SELECT_ACTIVE";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const SELECT_DATA_TYPE = "SELECT_DATA_TYPE";
export const SELECT_REQUEST_TYPE="SELECT_REQUEST_TYPE";
export const SWITCH_NAVTOP_IMAGE = "SWITCH_NAVTOP_IMAGE";
export const MAKE_COPYRIGHT_INFRIGEMENT_NOTICE_BEGIN = "MAKE_COPYRIGHT_INFRIGEMENT_NOTICE_BEGIN";
export const MAKE_COPYRIGHT_INFRIGEMENT_NOTICE_SUCCESS = "MAKE_COPYRIGHT_INFRIGEMENT_NOTICE_SUCCESS";
export const MAKE_COPYRIGHT_INFRIGEMENT_NOTICE_ERROR = "MAKE_COPYRIGHT_INFRIGEMENT_NOTICE_ERROR";
export interface SelectActiveAction {
    type: typeof TOGGLE_NAVTOP;     
}
export interface SwitchNavtopImage {
    type: typeof SWITCH_NAVTOP_IMAGE;
    image: string;
}

export interface OpenModal{
    type: typeof OPEN_MODAL;
    payload: string[];
}
export interface CloseModal{
    type: typeof CLOSE_MODAL;
}

export interface SelectDataType{
    type: typeof SELECT_DATA_TYPE
    payload: string;
}
export interface SelectRequestType{
    type: typeof SELECT_REQUEST_TYPE;
    id: number;
    category: string;

}
export interface MakeCopyrightInfrigementNoticeBegin{
    type: typeof MAKE_COPYRIGHT_INFRIGEMENT_NOTICE_BEGIN;

}
export interface MakeCopyrightInfrigementNoticeSuccess {
    type: typeof MAKE_COPYRIGHT_INFRIGEMENT_NOTICE_SUCCESS;

}
export interface MakeCopyrightInfrigementNoticeError {
    type: typeof MAKE_COPYRIGHT_INFRIGEMENT_NOTICE_ERROR;

}
export type InterfaceActionTypes = 
| SelectActiveAction
| OpenModal
| CloseModal
| SelectDataType
| SelectRequestType
| SwitchNavtopImage 
| MakeCopyrightInfrigementNoticeBegin
| MakeCopyrightInfrigementNoticeSuccess
| MakeCopyrightInfrigementNoticeError

export type AppActions = InterfaceActionTypes;
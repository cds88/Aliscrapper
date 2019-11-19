
import { FetchDataBegin, FetchDataSuccess, FetchDataError } from '../reducer_data/Actions';

import { FETCH_DATA_BEGIN, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from '../reducer_data/Actions';



import {TOGGLE_NAVTOP, OPEN_MODAL, CLOSE_MODAL, SELECT_DATA_TYPE, SELECT_REQUEST_TYPE,
SWITCH_NAVTOP_IMAGE,  MAKE_COPYRIGHT_INFRIGEMENT_NOTICE_BEGIN, MAKE_COPYRIGHT_INFRIGEMENT_NOTICE_SUCCESS, MAKE_COPYRIGHT_INFRIGEMENT_NOTICE_ERROR} from '../reducer_userinterface/Actions';
import { AllAppActions } from './AllActionsTypes';
import { Record } from '../reducer_data/Data';
import axios from 'axios';
import { Dispatch, bindActionCreators } from "redux";
import { AppState } from '../ConfigureStore';


export const FetchBegin = (): AllAppActions => ({

    type: FETCH_DATA_BEGIN
});

// results: Data[]
export const FetchSuccess = (payload: Record[]): AllAppActions => ({
    type: FETCH_DATA_SUCCESS,
    payload
});

export const ToggleNavtop = (): AllAppActions=>({
    type: TOGGLE_NAVTOP
})

export const OpenModal=(payload: string[]):AllAppActions=>({
    type: OPEN_MODAL,
    payload
    
})

export const CloseModal = (): AllAppActions => ({
    type: CLOSE_MODAL,

})

export const SelectDataType =(payload: string):AllAppActions=>({
    type: SELECT_DATA_TYPE,
    payload
})

export const SelectRequestType=(id:number, category:string):AllAppActions=>({
    type: SELECT_REQUEST_TYPE,
    id,
    category
})

export const SwitchNavtopImage = (image:string):AllAppActions=>({
    type: SWITCH_NAVTOP_IMAGE,
    image
})
export const MakeCopyrightInfrigementNoticeBegin = ():AllAppActions=>({
    type: MAKE_COPYRIGHT_INFRIGEMENT_NOTICE_BEGIN
})
export const MakeCopyrightInfrigementNoticeSuccess = (): AllAppActions => ({
    type: MAKE_COPYRIGHT_INFRIGEMENT_NOTICE_SUCCESS
})
export const MakeCopyrightInfrigementNoticeError = (): AllAppActions => ({
    type: MAKE_COPYRIGHT_INFRIGEMENT_NOTICE_ERROR
})
export const fetchBeginDispatch = (dataType:string) => {
    return (dispatch: Dispatch<AllAppActions>, getState: () => AppState) => {
        dispatch(FetchBegin());
        axios(`data/${dataType}/`).then(
            response => dispatch(FetchSuccess(response.data)))

    };
};

export interface Cookie{
    [cookieKey: string]: string
}

export const getCSRFToken = () => {
 
    var cookie= document.cookie.split(";").reduce<Cookie>((object, el) => { return { ...object, [el.split("=")[0]]: el.split("=")[1] } }, {})
    
    var token;
    Object.keys(cookie).forEach((el) => { if (el.includes("csrftoken"))  token= cookie[el]  })
    return token;
}

export const reportItems = (requestSelection:any)=>{
    const results = Object.keys(requestSelection).map(el => {
        return { item: el, category: requestSelection[el] }

    })  
    console.log(results);
    return(
        dispatch: Dispatch<AllAppActions>, getState:()=>AppState)=>{
            dispatch(MakeCopyrightInfrigementNoticeBegin());

        axios.post('/data/PostNotice/', results,
            {
                headers: {
                    'X-CSRFToken': getCSRFToken()
                }
            }
            )
            .then(
                response=>dispatch(MakeCopyrightInfrigementNoticeSuccess())
            ).catch(error=>{
                dispatch(MakeCopyrightInfrigementNoticeError())
            }) 
         
        

        }
}
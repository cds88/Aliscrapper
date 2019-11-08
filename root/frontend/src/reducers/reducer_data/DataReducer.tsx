import { DataInterface, Record } from './Data';

import { DataActionTypes } from "./Actions";
import { FETCH_DATA_BEGIN, FETCH_DATA_ERROR, FETCH_DATA_SUCCESS } from './Actions';

const DataReducerDefaultState: DataInterface = {
    isFetching: true,
    Records: null

}

const DataReducer = (
    state = DataReducerDefaultState,
    action: DataActionTypes
): DataInterface => {
    switch (action.type) {
        case FETCH_DATA_BEGIN:
            return {...state, isFetching:true}
        case FETCH_DATA_SUCCESS:
         
            return {...state, Records:action.payload, isFetching:false}
        case FETCH_DATA_ERROR:
            return {...state, isFetching:false}
        default:
            return state;
    }
};

export { DataReducer };

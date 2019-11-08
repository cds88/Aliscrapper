 
import { DataActionTypes } from '../reducer_data/Actions';
import { InterfaceActionTypes} from '../reducer_userinterface/Actions';

export type AllActionTypes =
         | DataActionTypes
        | InterfaceActionTypes


export type AllAppActions = AllActionTypes
import { UserInterface } from './UserInterface';
import { InterfaceActionTypes, TOGGLE_NAVTOP, OPEN_MODAL, CLOSE_MODAL, SELECT_DATA_TYPE, SELECT_REQUEST_TYPE, SWITCH_NAVTOP_IMAGE, MAKE_COPYRIGHT_INFRIGEMENT_NOTICE_BEGIN} from './Actions';
 

const InterfaceReducerDefaultState: UserInterface = {
    isNavTopOpened: true,
    isModalOpened: false,
    navTopImage: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    modalImages: null,
    selectedDataType: "all",
    selectedRequestTypes: {}
};
const InterfaceReducer = (
    state = InterfaceReducerDefaultState,
    action: InterfaceActionTypes
): UserInterface => {
    switch (action.type) {
        case TOGGLE_NAVTOP:
            return { ...state, isNavTopOpened: !state.isNavTopOpened   }
        case OPEN_MODAL:
            return { ...state, isModalOpened: true, modalImages:action.payload }
        case CLOSE_MODAL:
            return {...state, isModalOpened: false, modalImages: null}
        case SELECT_DATA_TYPE:
            return {...state, selectedDataType:action.payload}
        case SELECT_REQUEST_TYPE:

            return {...state, selectedRequestTypes:{...state.selectedRequestTypes, 
            [action.id]:action.category} }
        case SWITCH_NAVTOP_IMAGE:
            return { ...state, navTopImage:action.image}
        case MAKE_COPYRIGHT_INFRIGEMENT_NOTICE_BEGIN:
            window.location.reload();
            return {...state, selectedRequestTypes:{}}
        default:
            return state;
    }
}
export { InterfaceReducer }


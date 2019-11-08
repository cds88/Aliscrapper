import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { DataReducer } from "./reducer_data/DataReducer";
import { InterfaceReducer } from './reducer_userinterface/UserInterfaceReducer';
import { AllAppActions } from "./actions/AllActionsTypes";

export const rootReducer = combineReducers({
    DataReducer, InterfaceReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<AppState, AllAppActions>)
);

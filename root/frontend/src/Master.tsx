
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import styled from "styled-components";
import {useEffect} from 'react';

import  TableComponent  from './components/component_table/TableComponent';
import NavtopComponent from './components/component_navtop/NavtopComponent';

import { ThunkDispatch } from "redux-thunk";
import { connect } from 'react-redux';

import './styles/MasterStyles.scss';
import {UserInterface} from './reducers/reducer_userinterface/UserInterface';
import { AppState } from './reducers/ConfigureStore';

import {fetchBeginDispatch} from './reducers/actions/AllActions';
import {  Record} from './reducers/reducer_data/Data';
 
import { AllAppActions } from './reducers/actions/AllActionsTypes';
import { bindActionCreators } from 'redux';
import FooterComponent from './components/component_footer/FooterComponent';

import ModalComponent from './components/component_modal/ModalComponent';

import { CSSTransition } from 'react-transition-group';
export interface MasterProps {

}

export interface MasterState {
    name: string;
}


export interface LinkStateToProps{
    UserInterface: UserInterface
 

}
export interface LinkDispatchToProps{
    fetch:(dataType:string)=>void;
}
const MapStateToProps=(
    state: AppState,
    ownProps: MasterProps
): LinkStateToProps=>({
    UserInterface: state.InterfaceReducer,
    

});
const mapDispatchToProps=(
    dispatch: ThunkDispatch<any, any, AllAppActions>,
    ownProps: MasterProps
):LinkDispatchToProps=>({
    fetch: bindActionCreators(fetchBeginDispatch, dispatch),
})

type Props = MasterProps & LinkStateToProps & LinkDispatchToProps
const Master =(Props: Props) => {
    
    useEffect(()=>{
        Props.fetch(Props.UserInterface.selectedDataType);
        console.clear();
    },[])
    
        return (
            <div className="main-page">
            <div className="wrapper">
                <div className={`spacer ${Props.UserInterface.isNavTopOpened?('spacer-opened') : ('spacer-closed')}  `}/>
                    <NavtopComponent/>
                      <TableComponent/>  
                    <FooterComponent/>


                    <ModalComponent isModalOpened={Props.UserInterface.isModalOpened? true: false}/>
                   
            </div>
            </div>
        );
    
}

export default connect(MapStateToProps, mapDispatchToProps)(Master);


 






 
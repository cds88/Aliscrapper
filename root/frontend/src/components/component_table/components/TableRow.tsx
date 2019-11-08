import * as React from 'react';
import {useState, useEffect} from 'react';
import {Record} from '../../../reducers/reducer_data/Data';
import { connect } from 'react-redux';
import {UserInterface} from '../../../reducers/reducer_userinterface/UserInterface';
import {OpenModal, SelectRequestType, SwitchNavtopImage} from '../../../reducers/actions/AllActions';
import '../../../styles/TableRowStyles.scss';
import { AppState } from '../../../reducers/ConfigureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AllAppActions } from '../../../reducers/actions/AllActionsTypes';
import { bindActionCreators } from 'redux';

export interface RowProps{
    Record:Record;
}
interface LinkStateToProps{
    UserInterface: UserInterface
}
const mapStateToProps=(
    state: AppState,
    ownProps: RowProps

):LinkStateToProps=>({
    UserInterface: state.InterfaceReducer

})

interface LinkDispatchToProps{
    openModal: (images:string[]) => void;
    selectRequestType:(id:number, category:string)=>void;
    switchNavtopImage:(image:string)=>void;
}

const mapDispatchToProps =(
    dispatch: ThunkDispatch<any,any, AllAppActions>,
    ownProps: RowProps)=>({
    openModal: bindActionCreators(OpenModal, dispatch),
    selectRequestType :bindActionCreators(SelectRequestType, dispatch),
    switchNavtopImage :bindActionCreators(SwitchNavtopImage, dispatch)
})

type Props = RowProps & LinkStateToProps & LinkDispatchToProps;
const TableRow=(Props:Props)=> {


    const [active, setStatus] = useState<Boolean>(false  )
    const [myTimeout, setTimeOut] = useState({timeout:null}) 
    const [requestType, setRequestType] = useState<string>(null)
    const [isRequestSelected, setRequestSelector] = useState<boolean>(false)

 const handleHoverRow=()=>{
    if(!active){
        setStatus(!active);
    }
    Props.switchNavtopImage(Props.Record.thumb);


 }
 const cancelHoverRow=()=>{
    if(active){
        setStatus(!active);
    }
    
 }

const handleHoverImage =()=>{
    if(!Props.UserInterface.isModalOpened){
        setTimeOut({
            timeout: window.setTimeout(
                ()=>{
                    Props.openModal(Props.Record.images.split(","));
            },700)
        })
     }
}
const handleUnhoverImage=()=>{
    clearInterval(myTimeout.timeout)
}

const handleRequestTypeChange=(e:React.ChangeEvent<HTMLSelectElement>):void=>{
    setRequestType(e.target.value || null);

    switch(isRequestSelected){
        case true:
            Props.selectRequestType(Props.Record.id, e.target.value || null);
            return null;
        case false:
            return null;

    }
    
}
    const handleRequestType = () => { 
        switch(Props.Record.status){
            case "Requested":
                return(
                    <th className="record-requested">
                        <p>Request Sent</p>
                        <p>Type of request:</p>
                        <p>{Props.Record.category}</p>
                    </th>
                )
            case "Deleted":
                return(
                    <th className="record-deleted">
                        <p>Record deleted</p>
                        <p>Type of request</p>
                        <p>{Props.Record.category}</p>
                    </th>
                )
            default:
                return(
                    <th> <select id="requestTypeSelect" onChange={handleRequestTypeChange}>
                        <option value=""> Type of notice</option>
                        <option value="Trademark"> Trademark </option>
                        <option value="Iphone5"> Iphone5 </option>
                        <option value="Iphone6"> Iphone6 </option>
                        <option value="Iphone7"> Iphone7 </option>
                        <option value="Iphone8"> Iphone8 </option>
                        <option value="Iphone9"> Iphone9 </option>
                        <option value="IphoneX"> IphoneX </option>
                        

                    </select>
                    </th>
                )

        }


      
    };
    const handleRequestSelection = () => { 
        switch(Props.Record.status){
            case "Requested":
                return(
                   
                    <th className="record-requested" >
                        <p>Wyslane</p>
                        <p>Data</p>
                        <p>{Props.Record.dateRequested}</p>
                        <p>Godzina</p>
                        <p>{Props.Record.timeRequested.split(".")[0]}</p>
                    </th>
                )
            case "Deleted":
                return (
                    
                    <th className="record-deleted" >
                        <p>Usuniete</p>
                        <p>Data</p>
                        <p>{Props.Record.dateDeleted}</p>
                        <p>Godzina</p>
                        <p>{Props.Record.timeDeleted}</p>

                    </th>
                )
            default:
                return(
                 
                    <th>
                        <label>
                            <input
                                type="checkbox"
                                value={Props.Record.id}
                                onClick={selectRequest}
                                 />
                            Select </label>
                    </th>

                )


        }

    };
 
    const selectRequest = (e: any):void=>{
 
    if(!requestType){
        e.stopPropagation();
        e.preventDefault();
        return null
        
    }        
  
    switch(e.target.checked){
        case true:
            Props.selectRequestType(Props.Record.id, requestType);
            setRequestSelector(true);
            return null;
        case false:
            Props.selectRequestType(Props.Record.id, null);
            setRequestSelector(false);
            return null;
    }
   

   }

    return (
       
        <tr className={`content ${active? ('content-active'): ('')}`}
        onMouseEnter={handleHoverRow} 
        onMouseLeave={cancelHoverRow}>

            <th>{Props.Record.id}</th>
            <th>{Props.Record.name}</th>
            <th>{Props.Record.seller}</th>
            <th>{Props.Record.price}</th>
            <th>
                <a href={Props.Record.link} rel="noreferer noopener" target="_blank">
                    <img src={Props.Record.thumb } 
                    onMouseOver={handleHoverImage} 
                    onMouseOut={handleUnhoverImage}
                    />
                    </a>
            
            </th>
            <th>{handleRequestType()}</th>
            <th>{handleRequestSelection()}</th>

       </tr>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(TableRow);
import * as  React from 'react'
import '../../styles/NavtopStyles.scss';


 
import { ThunkDispatch } from "redux-thunk";
import { connect } from 'react-redux';
import { AppState } from '../../reducers/ConfigureStore';
import { AllAppActions } from '../../reducers/actions/AllActionsTypes';
import { Dispatch, bindActionCreators } from "redux";
import {ToggleNavtop, SelectDataType, fetchBeginDispatch} from '../../reducers/actions/AllActions';
import {UserInterface} from '../../reducers/reducer_userinterface/UserInterface';

import {reportItems} from '../../reducers/actions/AllActions';
import GridBackground  from './components/GridBackground';
import axios from 'axios';

interface NavtopProps{

}
interface LinkStateToProps{
    UserInterface: UserInterface
}

const mapStateToProps =(
    state: AppState,
    ownProps: NavtopProps
):LinkStateToProps=>({
    UserInterface: state.InterfaceReducer
})
interface LinkDispatchProps{
    ToggleNavigation: ()=>void;
    SelectDataType :(dataType:string)=>void;
    refreshData:(dataType: string)=>void;
    reportItems: (requestSelection: any)=>void;
   
}
 
const MapDispatchToProps=(
   dispatch: ThunkDispatch<any, any, AllAppActions>,
    ownProps: NavtopProps
): LinkDispatchProps=>({
    ToggleNavigation : bindActionCreators(ToggleNavtop, dispatch),
    SelectDataType : bindActionCreators(SelectDataType, dispatch),
    refreshData: bindActionCreators(fetchBeginDispatch, dispatch),
    reportItems: bindActionCreators(reportItems, dispatch)
     
})
type Props = NavtopProps & LinkDispatchProps & LinkStateToProps
const NavtopComponent = (Props: Props)=> {
    

 
    const handleButtonOpener=()=>{
         
         Props.ToggleNavigation();
    }
    const handlePostNotice=(e:React.MouseEvent<HTMLAnchorElement>)=>{
        e.preventDefault();
  
        Props.reportItems(Props.UserInterface.selectedRequestTypes);
          
    }
    const copyrightInfringementNotice = () => {
        switch(Props.UserInterface.selectedDataType){
            case "all":
            case "idle":
                return(
                    <li>
                        {/* <a href="" className="btn btn-secondary" onClick={this.handleRequest}>Wyslij zgloszenia</a> */}
                        <a href="" 
                        className="btn btn-secondary button-special"
                        onClick={handlePostNotice}>
                        Send requests</a>
                    </li>
                )
            default:
                return null
        } 
    }


    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        console.log(e.target.value);
        
        Props.SelectDataType(e.target.value);
        Props.refreshData(e.target.value);
    }
    
    const handleLogout = (e:any)=>{
     

            e.preventDefault();

            axios('logout/').then(() => window.location.href = 'login/');

        
    }
    return (

        <React.Fragment>
            <div className={`nav-top ${Props.UserInterface.isNavTopOpened ? ("") : ("hidden")}`}>
            <GridBackground/>
                <ul className="navtop-ul">
                    
                    <li> 
                        <select name="" id=""  
                            onChange={handleOptionChange} >    
                          
                            <option value="all" >All </option>
                            <option value="idle">Idle</option>
                            <option value="ItemRequested">Requested</option>
                            <option value="ItemDeleted">Deleted</option> 
                         </select>
                    </li>
                    {copyrightInfringementNotice()} 
            

                    <li><button className="btn btn-secondary button-special"
                        onClick={handleLogout}>Logout </button></li>
                    
                    <li className="legend"><h4>Legend </h4> <p>Requested</p> <p>Deleted</p> </li>
              


                    <li> <h3>Aliexpress</h3>  </li>
                    <li><div className="image-container"   >
                 
                        <img className="image" src={Props.UserInterface.navTopImage} />
              
                   

                    </div>
                    </li>
                   
                    </ul>


        </div>
            <button className="btn btn-secondary navtop-opener button-special" onClick={handleButtonOpener} >{Props.UserInterface.isNavTopOpened ? 'Close' : 'Open'}</button>
        </React.Fragment>
    )
}


export default connect(mapStateToProps, MapDispatchToProps)( NavtopComponent);
import * as React from 'react';

import { Record} from '../../reducers/reducer_data/Data';
import { AppState } from '../../reducers/ConfigureStore';
import { connect } from 'react-redux';

import TableRow from './components/TableRow';

import '../../styles/TableStyles.scss';

import {useEffect} from 'react';

export interface TableProps{
     

}

export interface LinkStateToProps{
    Records: Record[],
    isFetching: boolean
}

const MapStateToProps=(
    state: AppState,
    ownProps: TableProps
):LinkStateToProps=>({

        Records: state.DataReducer.Records,
        isFetching: state.DataReducer.isFetching
});
type Props = TableProps & LinkStateToProps;
const TableComponent = (Props: Props) =>{

    if(Props.isFetching){
        return(
            <div className="spinner-wrapper">
            <h1>LOADING DATA</h1>
            </div>
        )
    }
    if(Props.Records.length===0){
        return(
            <div className="spinner-wrapper">
            <h1>NOT DATA YET</h1>
            </div>
        )
    }
    
    
    
    

    const results = Props.Records;
    const content = results.map((item) => {
        return <TableRow key={item.id} Record={item}   />

    })
    return (
        <div>
            <div className="table-wrapper">

                <table className="table">

                    <thead>

                        <tr>
                            <th> ID   </th>
                            <th>Name</th>
                            <th>Seller</th>
                            <th>Price</th>
                            <th>Photo/link</th>
                            <th>Type of request</th>
                            <th>Requested?</th>
                        </tr>
                            
                    </thead>
                    <tbody>
                         {content}  

                    </tbody>




                </table>

            </div>
        </div>
    )
}
export default connect(MapStateToProps, null)( TableComponent);
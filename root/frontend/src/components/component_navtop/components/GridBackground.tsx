import * as React from 'react';
import '../../../styles/GridBackgroundStyles.scss';



const GridBackground=()=> {

    var rows=[];
    for (var i=0; i<12; i++){
        rows.push(<p></p>)
    }





    return (
        <div id="grid-background">
            <p></p><p></p>
            <p></p><p></p>
            <p></p><p></p>
            <p></p><p></p>
            <p></p><p></p>
            <p></p><p></p>


        </div>
    )
}
export default GridBackground;
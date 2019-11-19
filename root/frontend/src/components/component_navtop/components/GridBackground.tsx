import * as React from 'react';
import '../../../styles/GridBackgroundStyles.scss';



const GridBackground=()=> {

   
  


    return (
        <div id="grid-background">

            {Array.from({ length: 12 }, el => <p />)}

        </div>
    )
}
export default GridBackground;
import * as React from 'react';


import { Provider } from 'react-redux';


import { store } from "./reducers/ConfigureStore";

import Master from './Master';



const App: React.FC = () => {
    
    return (

        <Provider store={store}>
            
            <Master />

        </Provider>


    )
}

export default App;


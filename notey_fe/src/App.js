import React from 'react';
import {StyledDashboard} from "./components/Dashboard";
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import noteReducer from "./reducers/note_reducers";
import Provider from "react-redux/es/components/Provider";

function App() {

    const store = createStore(
        noteReducer,
        applyMiddleware(thunkMiddleware)
    );

    return (
        <Provider store={store}>
            <div className="App">
                <StyledDashboard/>
            </div>
        </Provider>
    );
}

export default App;

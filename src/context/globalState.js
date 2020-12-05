import React, { createContext, useReducer } from 'react';
import Reducers from "./reducers.js";

const initialState = {
    lastRequest: 0,
    data: [],
}

export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducers, initialState)

    //Actions
    function updateGeoData(data) {
        dispatch({
            type: 'UPDATE_GEO_DATA',
            payload: data
        });
    }

    function updateLastDataRequest(time) {
        dispatch({
            type: 'LAST_DATA_UPDATE',
            payload: time
        });
    }

    return (
        <GlobalContext.Provider value={{
            lastRequest: state.lastRequest,
            data: state.data,
            updateGeoData,
            updateLastDataRequest
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
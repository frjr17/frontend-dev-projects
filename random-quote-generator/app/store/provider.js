'use client';
import { Provider } from "react-redux";
import { store } from ".";


/**Redux provider */
export function Providers({ children }) {
    return <Provider store={store}>{children}</Provider>
}